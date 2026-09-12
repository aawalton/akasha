import { chmodSync, mkdirSync } from "node:fs"
import { dirname } from "node:path"
import {
  isInvalidCredentialsError,
  signInWithPassword,
} from "akasha/alan/harness/supabase-auth/auth/auth.module.code.ts"
import { assertCredentialPathAllowed } from "akasha/alan/harness/supabase-auth/protected-user/protected-user.module.code.ts"
import { createClient } from "akasha/alan/harness/supabase-client/user-client/user-client.module.code.ts"
import {
  DEFAULT_THROWAWAY_EMAIL,
  ensureThrowawayUser,
} from "akasha/alan/harness/supabase-server/throwaway-user/throwaway-user.module.code.ts"
import { readBrowserTestEnv } from "akasha/code/browser/test-harness/browser-test-env/browser-test-env.module.code.ts"
import { launchAndSignIn } from "akasha/code/browser/test-harness/harness-launch/harness-launch.module.code.ts"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { output as outputArgument } from "akasha/commands/arguments/pages/output.argument.ts"
import { signInPath as signInPathArgument } from "akasha/commands/arguments/pages/sign-in-path.argument.ts"
import { url as urlArgument } from "akasha/commands/arguments/pages/url.argument.ts"
import {
  answering,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { browserTestStorageState as page } from "akasha/commands/pages/browser/test-storage-state/browser-test-storage-state.command.ts"
import { playwrightStorageStatePath } from "akasha/seat-system/supervising/mcp-registry/mcp-registry.module.code.ts"

const OWNER_ONLY = 0o600

export function healable(
  email: string,
  error: unknown,
  known: string = DEFAULT_THROWAWAY_EMAIL
): boolean {
  return error != null && email === known && isInvalidCredentialsError(error)
}

export type StorageStateAsked = {
  readonly url?: string | undefined
  readonly signInPath?: string | undefined
  readonly output?: string | undefined
}

export async function exportBrowserTestStorageState(
  asked: StorageStateAsked = {},
  done: string[] = []
): Promise<readonly string[]> {
  const read = readBrowserTestEnv()
  if (read.missing || read.env === null) {
    throw new Error(
      "this reads BROWSER_TEST_URL, BROWSER_TEST_EMAIL, BROWSER_TEST_PASSWORD, SUPABASE_URL, " +
        "SUPABASE_ANON_KEY and SUPABASE_SERVICE_ROLE_KEY from the environment, and one is unset"
    )
  }
  const env = read.env
  const url = (asked.url ?? env.url).replace(/\/+$/, "")
  const signInPath = asked.signInPath ?? signInPathArgument.default
  const output = asked.output ?? playwrightStorageStatePath()

  const client = createClient(env.supabaseUrl, env.supabaseAnonKey)
  let signIn = await signInWithPassword(client, env.email, env.password)
  if (healable(env.email, signIn.error)) {
    await ensureThrowawayUser(
      {
        email: env.email,
        password: env.password,
        resetPassword: true,
        acknowledgeCanonicalRotation: true,
      },
      done
    )
    done.push(
      `the password ${env.email} carries was refused, and it is the throwaway user, so it was ` +
        "set to the one the environment states and tried once more"
    )
    signIn = await signInWithPassword(client, env.email, env.password)
  }
  if (signIn.error != null) {
    throw new Error(`${env.email} was not signed in: ${signIn.error.message}`)
  }
  if (signIn.user == null) {
    throw new Error(`${env.email} signed in and no user came back, so there is no id to check`)
  }
  assertCredentialPathAllowed({ resolvedUserId: signIn.user.id })

  const {
    browser,
    context,
    page: tab,
  } = await launchAndSignIn({ url, email: env.email, password: env.password }, signInPath)
  try {
    done.push(`signed in at ${tab.url()}`)
    mkdirSync(dirname(output), { recursive: true })
    await context.storageState({ path: output })
    done.push(`wrote the storage state to ${output}`)
    chmodSync(output, OWNER_ONLY)
    return done
  } finally {
    await browser.close()
  }
}

export type Exporting = (done: string[], asked: StorageStateAsked) => Promise<Answer>

async function exported(done: string[], asked: StorageStateAsked): Promise<Answer> {
  return told(await exportBrowserTestStorageState(asked, done))
}

export async function exportedBy(
  asked: StorageStateAsked,
  exporting: Exporting = exported
): Promise<Answer> {
  return await answering(async (done) => await exporting(done, asked))
}

export async function browserTestStorageState(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [
    outputArgument,
    signInPathArgument,
    urlArgument,
  ])
  if ("refused" in read) return refusedBy(read.refused)
  return await exportedBy({
    url: read.taken.url,
    signInPath: read.taken.signInPath,
    output: read.taken.output,
  })
}
