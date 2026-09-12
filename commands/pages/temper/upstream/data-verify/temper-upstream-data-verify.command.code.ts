import { existsSync } from "node:fs"
import { join } from "node:path"
import { takenFor } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.code.ts"
import { library as libraryArgument } from "akasha/commands/arguments/pages/library.argument.ts"
import {
  answeredWith,
  DATA,
  OPERATIONAL,
  refused,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { temperUpstreamDataVerify as page } from "akasha/commands/pages/temper/upstream/data-verify/temper-upstream-data-verify.command.ts"
import { addonsDir } from "akasha/temper/eso-paths/eso-paths-resolve/eso-paths-resolve.module.code.ts"
import { verifyHousing } from "akasha/temper/upstream-data/housing-upstream-verify/housing-upstream-verify.module.code.ts"
import { verifyMapData } from "akasha/temper/upstream-data/map-data-upstream-verify/map-data-upstream-verify.module.code.ts"
import { verifyTreasure } from "akasha/temper/upstream-data/treasure-upstream-verify/treasure-upstream-verify.module.code.ts"
import type {
  Ruling,
  UpstreamLibrary,
} from "akasha/temper/upstream-data/upstream-libraries/upstream-libraries.module.code.ts"
import {
  libraryNamed,
  SOURCES_OF,
  UPSTREAM_LIBRARIES,
} from "akasha/temper/upstream-data/upstream-libraries/upstream-libraries.module.code.ts"
import { verifyZone } from "akasha/temper/upstream-data/zone-upstream-verify/zone-upstream-verify.module.code.ts"
import { saidBy } from "akasha/utils/narrow/said-by/said-by.module.code.ts"

const RULED_BY: Record<UpstreamLibrary, (addons: string) => Promise<Ruling>> = {
  housing: verifyHousing,
  "lib-map-data": verifyMapData,
  "lib-treasure": verifyTreasure,
  "lib-zone": verifyZone,
}

function missingUnder(addons: string, library: UpstreamLibrary): readonly string[] {
  return SOURCES_OF[library].filter((one) => !existsSync(join(addons, one)))
}

function whereUpstreamIs(): { readonly addons: string } | { readonly why: string } {
  try {
    return { addons: addonsDir() }
  } catch (thrown) {
    return { why: saidBy(thrown).replace(/\s+/g, " ").trim() }
  }
}

const NAMED = [libraryArgument]

export async function temperUpstreamDataVerify(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const taking = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in taking) return mistaking(taking.refused)
  const said = taking.taken.library
  const library = libraryNamed(said)
  if (library === undefined) {
    return refused(
      `\`${said}\` is no upstream library this rules on — name one of: ${UPSTREAM_LIBRARIES.join(", ")}`,
      DATA
    )
  }

  const where = whereUpstreamIs()
  if ("why" in where) {
    return refused(
      `${library} is ruled on against the upstream files a live ESO install carries, and no live directory was found — ${where.why}`,
      DATA
    )
  }

  const missing = missingUnder(where.addons, library)
  if (missing.length > 0) {
    return refused(
      `${where.addons} carries none of ${missing.join(", ")}, so there is no upstream here to rule ${library} against. ` +
        `A run over an absent upstream would report whatever a clean run reports, so it is refused rather than passed.`,
      DATA
    )
  }

  let ruling: Ruling
  try {
    ruling = await RULED_BY[library](where.addons)
  } catch (thrown) {
    return refused(
      `ruling on ${library} broke off before it could answer — ${saidBy(thrown).replace(/\s+/g, " ").trim()}`,
      OPERATIONAL
    )
  }

  const read = SOURCES_OF[library].map((one) => join(where.addons, one))
  const report = [...ruling.report, `read upstream from ${read.join(", ")}`]
  if (ruling.parted.length === 0) return told(report)
  return answeredWith(
    report,
    [...ruling.parted, `${library} no longer matches upstream`],
    OPERATIONAL
  )
}
