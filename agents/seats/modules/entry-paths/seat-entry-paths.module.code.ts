import { besideAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { listedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { akashaRoot } from "akasha/pages/modules/checkout-roots/checkout-roots.module.code.ts"

const MODULE = "module"

const CODE = "code"

const TS = "ts"

const PTY_PROXY = "pty-proxy"

const SUPERVISOR = "run-supervisor"

const SEAT_RESUME = "seat-resume"

function entryOf(root: string, slug: string): string {
  const page = listedAt(root, MODULE, slug)[0]
  const at = page === undefined ? null : besideAt(page.path, CODE, TS)
  if (at === null) {
    throw new Error(`no \`${MODULE}\` is slugged \`${slug}\`, so no seat would come up`)
  }
  return at
}

export function ptyProxyRel(root: string = akashaRoot()): string {
  return entryOf(root, PTY_PROXY)
}

export function supervisorRel(root: string = akashaRoot()): string {
  return entryOf(root, SUPERVISOR)
}

export function seatResumeRel(root: string = akashaRoot()): string {
  return entryOf(root, SEAT_RESUME)
}
