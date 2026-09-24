import { chmod, mkdir, writeFile } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import {
  type Cookie,
  signedInCookies,
} from "akasha/code/browser/test-harness/modules/signed-in-harness/signed-in-harness.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { out as outArgument } from "akasha/command/argument/pages/out.argument.ts"
import { url } from "akasha/command/argument/pages/url.argument.ts"
import { refusedBy, told } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { browserSignIn as page } from "akasha/command/pages/browser/sign-in/browser-sign-in.command.ts"

const TAKES = [outArgument, url] as const

const URL_SAID = url.said

const LOCAL = /^https?:\/\/localhost|^https?:\/\/127\.0\.0\.1/

const OWNER_ONLY = 0o600

export function signingInCode(cookies: readonly Cookie[]): string {
  return `async (page) => {
  await page.context().addCookies(${JSON.stringify(cookies)})
  return "signed in"
}
`
}

export async function browserSignIn(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, TAKES)
  if ("refused" in read) return refusedBy(read.refused)
  const taken = read.taken

  const base = taken.url.replace(/\/+$/, "")
  if (LOCAL.test(base)) {
    return refusedBy([
      `${URL_SAID} takes a deployed origin rather than ${base}: the session is traded at the ` +
        "deployed site, and a dev server holds no session of its own to trade",
    ])
  }

  let cookies: readonly Cookie[]
  try {
    cookies = await signedInCookies(new URL(base).origin)
  } catch (thrown) {
    return refusedBy([thrown instanceof Error ? thrown.message : String(thrown)])
  }

  const written = resolve(given.root, taken.out)
  await mkdir(dirname(written), { recursive: true })
  await writeFile(written, signingInCode(cookies), { mode: OWNER_ONLY })
  await chmod(written, OWNER_ONLY)
  return told([written])
}
