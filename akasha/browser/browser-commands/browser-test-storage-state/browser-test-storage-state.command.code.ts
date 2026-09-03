import { chmodSync, mkdirSync } from "node:fs"
import { dirname } from "node:path"
import { readBrowserTestEnv } from "@akasha/browser-test-harness/browser-test-env"
import { launchAndSignIn } from "@akasha/browser-test-harness/harness-launch"
import type { Answer } from "@akasha/command-system/calling"
import { isInvalidCredentialsError, signInWithPassword } from "@akasha/supabase-auth/auth"
import { assertCredentialPathAllowed } from "@akasha/supabase-auth/protected-user"
import { createClient } from "@akasha/supabase-client/user-client"
import {
  DEFAULT_THROWAWAY_EMAIL,
  ensureThrowawayUser,
} from "@akasha/supabase-server/throwaway-user"
import { playwrightStorageStatePath } from "@tools/lib/mcp-registry"
import {
  refusedBy,
  wordsIn,
} from "../browser-command-arguing/browser-command-arguing.module.code.ts"

const URL_SAID = "--url"

const SIGN_IN_PATH = "--sign-in-path"

const AT = "--at"

const VALUED: readonly string[] = [URL_SAID, SIGN_IN_PATH, AT]

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

export async function browserTestStorageState(argv: readonly string[]): Promise<Answer> {
  const said = wordsIn(argv, VALUED, NO_SWITCH)
  if ("refused" in said) return refusedBy(said.refused)

  const read = readBrowserTestEnv()
  if (read.missing || read.env === null) {
    return refusedBy([
      "this reads BROWSER_TEST_URL, BROWSER_TEST_EMAIL, BROWSER_TEST_PASSWORD, SUPABASE_URL, " +
        "SUPABASE_ANON_KEY and SUPABASE_SERVICE_ROLE_KEY from the environment, and one is unset",
    ])
  }
  const env = read.env
  const url = (said.named[URL_SAID] ?? env.url).replace(/\/+$/, "")
  const signInPath = said.named[SIGN_IN_PATH] ?? DEFAULT_SIGN_IN

  let at: string
  try {
    at = said.named[AT] ?? playwrightStorageStatePath()
  } catch (thrown) {
    return refusedBy([thrown instanceof Error ? thrown.message : String(thrown)])
  }

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
    return refusedBy([`${env.email} was not signed in: ${signIn.error.message}`])
  }
  if (signIn.user == null) {
    return refusedBy([`${env.email} signed in and no user came back, so there is no id to check`])
  }
  assertCredentialPathAllowed({ resolvedUserId: signIn.user.id })

  const { browser, context, page } = await launchAndSignIn(
    { url, email: env.email, password: env.password },
    signInPath
  )
  try {
    mkdirSync(dirname(at), { recursive: true })
    await context.storageState({ path: at })
    chmodSync(at, OWNER_ONLY)
    report.push(`signed in at ${page.url()}`, `wrote the storage state to ${at}`)
    return { report, refusals: [], code: 0 }
  } finally {
    await browser.close()
  }
}
