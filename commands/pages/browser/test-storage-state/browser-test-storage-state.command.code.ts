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
import { wordsIn } from "akasha/code/browser/commands/browser-command-arguing/browser-command-arguing.module.code.ts"
import { readBrowserTestEnv } from "akasha/code/browser/test-harness/browser-test-env/browser-test-env.module.code.ts"
import { launchAndSignIn } from "akasha/code/browser/test-harness/harness-launch/harness-launch.module.code.ts"
import {
  OPERATIONAL,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer } from "akasha/commands/modules/calling/calling.module.code.ts"
import { playwrightStorageStatePath } from "akasha/seat-system/supervising/mcp-registry/mcp-registry.module.code.ts"

const URL_SAID = "--url"

const SIGN_IN_PATH = "--sign-in-path"

const OUTPUT = "--output"

const VALUED: readonly string[] = [URL_SAID, SIGN_IN_PATH, OUTPUT]

const NO_SWITCH: readonly string[] = []

const DEFAULT_SIGN_IN = "/sign-in"

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
  asked: StorageStateAsked = {}
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
  const signInPath = asked.signInPath ?? DEFAULT_SIGN_IN
  const output = asked.output ?? playwrightStorageStatePath()

  const report: string[] = []
  const client = createClient(env.supabaseUrl, env.supabaseAnonKey)
  let signIn = await signInWithPassword(client, env.email, env.password)
  if (healable(env.email, signIn.error)) {
    report.push(
      `the password ${env.email} carries was refused, and it is the throwaway user, so it is ` +
        "being set to the one the environment states and tried once more"
    )
    await ensureThrowawayUser({
      email: env.email,
      password: env.password,
      resetPassword: true,
      acknowledgeCanonicalRotation: true,
    })
    signIn = await signInWithPassword(client, env.email, env.password)
  }
  if (signIn.error != null) {
    throw new Error(`${env.email} was not signed in: ${signIn.error.message}`)
  }
  if (signIn.user == null) {
    throw new Error(`${env.email} signed in and no user came back, so there is no id to check`)
  }
  assertCredentialPathAllowed({ resolvedUserId: signIn.user.id })

  const { browser, context, page } = await launchAndSignIn(
    { url, email: env.email, password: env.password },
    signInPath
  )
  try {
    mkdirSync(dirname(output), { recursive: true })
    await context.storageState({ path: output })
    chmodSync(output, OWNER_ONLY)
    report.push(`signed in at ${page.url()}`, `wrote the storage state to ${output}`)
    return report
  } finally {
    await browser.close()
  }
}

export async function browserTestStorageState(argv: readonly string[]): Promise<Answer> {
  const said = wordsIn(argv, VALUED, NO_SWITCH)
  if ("refused" in said) return refusedBy(said.refused)
  try {
    const report = await exportBrowserTestStorageState({
      url: said.named[URL_SAID],
      signInPath: said.named[SIGN_IN_PATH],
      output: said.named[OUTPUT],
    })
    return told(report)
  } catch (thrown) {
    return refusedBy([thrown instanceof Error ? thrown.message : String(thrown)], OPERATIONAL)
  }
}
