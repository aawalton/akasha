import {
  type Answer,
  type Given,
  refused,
} from "akasha/commands/modules/calling/calling.module.code.ts"
import { gitDirIn } from "akasha/git/dir/git-dir.module.code.ts"
import { foundIn, takingFrom } from "akasha/git/store-sweeping/git-store-sweeping.module.code.ts"

const DRY_RUN = "--dry-run"

const MISTOOK = 1

const NOTHING = "nothing akasha left is under the folder git does not track"

const NO_GIT_DIR = "git names no directory for this checkout, so there is nowhere to sweep"

export function gitSweep(argv: readonly string[], given: Given): Answer {
  const dry = argv.length === 1 && argv[0] === DRY_RUN
  if (argv.length > 0 && !dry) {
    return refused(
      `\`${argv.join(" ")}\` is not an argument this takes — this command takes \`${DRY_RUN}\` alone`,
      MISTOOK
    )
  }
  const gitDir = gitDirIn(given.root)
  if (gitDir === null) return refused(NO_GIT_DIR, MISTOOK)
  const found = foundIn(gitDir).filter((one) => one.there)
  if (found.length === 0) return { report: [NOTHING], refusals: [], code: 0 }
  if (dry) {
    return { report: found.map((one) => `would take\t${one.at}`), refusals: [], code: 0 }
  }
  const said = takingFrom(gitDir, found)
  return {
    report: said.took.map((one) => `took\t${one}`),
    refusals: said.refusals,
    code: said.refusals.length === 0 ? 0 : MISTOOK,
  }
}
