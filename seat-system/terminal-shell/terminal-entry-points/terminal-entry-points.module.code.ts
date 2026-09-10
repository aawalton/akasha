import { akashaRoot } from "akasha/pages/checkout-roots/checkout-roots.module.code.ts"
import { besideAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { listedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import {
  ptyProxyRel,
  seatResumeRel,
  supervisorRel,
} from "../../seat-entry-paths/seat-entry-paths.module.code.ts"

export const ROOT = "${AKASHA_ROOT:-$HOME/repos/akasha}"

export const ROOT_LOCAL = `local _root="${ROOT}"`

export function supervisor(): string {
  return `"$_root/${supervisorRel()}"`
}

export function proxy(): string {
  return `"$_root/${ptyProxyRel()}"`
}

export const SEAT_START_DIR = "$HOME/repos"

export function seatResume(): string {
  return `"$_root/${seatResumeRel()}"`
}

const SHELL_SCRIPT = "shell-script"

const LAUNCHER = "akasha-launcher"

const SHELL = "shell"

const SH = "sh"

function launcherRel(): string {
  const page = listedAt(akashaRoot(), SHELL_SCRIPT, LAUNCHER)[0]
  const at = page === undefined ? null : besideAt(page.path, SHELL, SH)
  if (at === null) {
    throw new Error(
      `no \`${SHELL_SCRIPT}\` is slugged \`${LAUNCHER}\`, so a terminal reaches no command`
    )
  }
  return at
}

export function akashaCommand(): string {
  return `"${ROOT}/${launcherRel()}"`
}
