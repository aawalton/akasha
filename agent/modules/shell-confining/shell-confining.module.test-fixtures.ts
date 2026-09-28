import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  symlinkSync,
  writeFileSync,
} from "node:fs"
import { dirname, join } from "node:path"
import { SHAPE } from "akasha/code/type/narrowing/modules/shape/shape.module.code.ts"
import { codeRoot } from "akasha/page/modules/code-root/code-root.module.code.ts"

export const FENCE = "HEREDOC"

export const CHANGE = [
  `akasha change apply --draft change-file <<'${FENCE}'`,
  "at: a.ts",
  FENCE,
].join("\n")

export const FED = " < /dev/null"

const SCRIPT_AT = join(
  "code",
  "shell-script",
  "pages",
  "shell-confinement",
  "shell-confinement.shell-script.shell.sh"
)

const JUDGE_AT = join("agent", "modules", "shell-confining", "shell-confining.module.code.ts")

const HIDER_AT = join("agent", "modules", "withheld-hiding", "withheld-hiding.module.code.ts")

export const SCRIPT = join(codeRoot(), SCRIPT_AT)

const OWN_AKASHA = '#!/usr/bin/env bash\ntouch "$AKASHA_ROOT/by-akasha"\n'

const BWRAP_HANDED = "bwrap-handed"

const OWN_BWRAP = [
  "#!/usr/bin/env bash",
  `printf "%s\\n" "$@" > "$(dirname "$0")/${BWRAP_HANDED}"`,
  "while [[ $1 != -- ]]; do shift; done",
  "shift",
  'exec "$@"',
  "",
].join("\n")

export const FED_BODY: readonly string[] = ['say "hi" to $HOME and $(touch a.ts)', "`touch a.ts`"]

export type Held = {
  readonly root: string
  readonly bin: string
  readonly cwd: string
}

export function lineOf(command: string, fed = FED, cwdAt = "/var/tmp/claude-ab12-cwd"): string {
  const quoted = command.replaceAll("'", `'"'"'`)
  return `source /s/snapshot.sh 2>/dev/null || true && eval '${quoted}'${fed} && pwd -P >| ${cwdAt}`
}

export function fedBy(opening: string, body: readonly string[], closing: string = FENCE): string {
  return [opening, ...body, closing].join("\n")
}

export function bwrapHanded(held: Held): string | null {
  const at = join(held.bin, BWRAP_HANDED)
  return existsSync(at) ? readFileSync(at, "utf8") : null
}

export function homeOf(held: Held): string {
  return join(dirname(held.bin), "home")
}

export function bareBin(held: Held): string {
  const at = join(dirname(held.bin), "bare")
  mkdirSync(at)
  for (const one of ["bash", "bun", "dirname", "readlink", "touch"]) {
    symlinkSync(SHAPE.string().parse(Bun.which(one)), join(at, one))
  }
  return at
}

export function heldIn(at: string): Held {
  const held = { root: join(at, "root"), bin: join(at, "bin"), cwd: join(at, "cwd") }
  for (const one of [held.root, held.bin]) mkdirSync(one)
  writeFileSync(join(held.bin, "akasha"), OWN_AKASHA, { mode: 0o755 })
  writeFileSync(join(held.bin, "bwrap"), OWN_BWRAP, { mode: 0o755 })
  return held
}

export function runtimeIn(at: string): string {
  for (const one of ["akasha", "systemd"]) mkdirSync(join(at, one))
  for (const one of ["bus", join("systemd", "private"), "ssh-agent.socket"]) {
    writeFileSync(join(at, one), "")
  }
  return at
}

export function scriptIn(tree: string, judge: string | null): string {
  for (const at of [SCRIPT_AT, JUDGE_AT, HIDER_AT]) {
    mkdirSync(dirname(join(tree, at)), { recursive: true })
  }
  copyFileSync(SCRIPT, join(tree, SCRIPT_AT))
  symlinkSync(join(codeRoot(), HIDER_AT), join(tree, HIDER_AT))
  if (judge === null) symlinkSync(join(codeRoot(), JUDGE_AT), join(tree, JUDGE_AT))
  else writeFileSync(join(tree, JUDGE_AT), judge)
  return join(tree, SCRIPT_AT)
}
