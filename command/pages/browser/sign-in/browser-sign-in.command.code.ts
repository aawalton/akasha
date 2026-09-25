import { chmod, mkdir, writeFile } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import {
  type SigningIn,
  signingInFor,
} from "akasha/code/browser/test-harness/modules/signed-in-harness/signed-in-harness.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { out as outArgument } from "akasha/command/argument/pages/out.argument.ts"
import { path as pathArgument } from "akasha/command/argument/pages/path.argument.ts"
import { url } from "akasha/command/argument/pages/url.argument.ts"
import { refusedBy, told } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { browserSignIn as page } from "akasha/command/pages/browser/sign-in/browser-sign-in.command.ts"

const TAKES = [outArgument, pathArgument, url] as const

const URL_SAID = url.said

const LOCAL = /^https?:\/\/localhost|^https?:\/\/127\.0\.0\.1/

const OWNER_ONLY = 0o600

function signingInCode(signing: SigningIn, at: string): string {
  if ("landing" in signing) {
    return `async (page) => {
  await page.goto(${JSON.stringify(signing.landing)})
  return page.url()
}
`
  }
  const traded = { exchange: signing.exchange, code: signing.code, verifier: signing.verifier }
  return `async (page) => {
  await page.goto(${JSON.stringify(signing.origin)})
  const status = await page.evaluate(async (said) => {
    const answer = await fetch(said.exchange, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ code: said.code, verifier: said.verifier }),
    })
    return answer.status
  }, ${JSON.stringify(traded)})
  if (status !== 200) return "the exchange answered " + status + ", so the browser is still nobody"
  await page.goto(${JSON.stringify(at)})
  return page.url()
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

  let signing: SigningIn
  try {
    signing = await signingInFor(new URL(base).origin, taken.path)
  } catch (thrown) {
    return refusedBy([thrown instanceof Error ? thrown.message : String(thrown)])
  }

  const written = resolve(given.root, taken.out)
  await mkdir(dirname(written), { recursive: true })
  await writeFile(written, signingInCode(signing, `${base}${taken.path}`), { mode: OWNER_ONLY })
  await chmod(written, OWNER_ONLY)
  return told([written])
}
