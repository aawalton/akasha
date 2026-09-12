import { realpathSync } from "node:fs"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { codeRoot as codeRootArgument } from "akasha/commands/arguments/pages/code-root.argument.ts"
import { library as libraryArgument } from "akasha/commands/arguments/pages/library.argument.ts"
import {
  answering,
  DATA,
  INPUT,
  refused,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { temperUpstreamDataPort as page } from "akasha/commands/pages/temper/upstream/data-port/temper-upstream-data-port.command.ts"
import { codeRoot } from "akasha/pages/code-root/code-root.module.code.ts"
import { port as portHousing } from "akasha/temper/upstream-data/housing-upstream-port/housing-upstream-port.module.code.ts"
import { port as portMapData } from "akasha/temper/upstream-data/map-data-upstream-port/map-data-upstream-port.module.code.ts"
import { port as portTreasure } from "akasha/temper/upstream-data/treasure-upstream-port/treasure-upstream-port.module.code.ts"
import type { UpstreamLibrary } from "akasha/temper/upstream-data/upstream-libraries/upstream-libraries.module.code.ts"
import {
  libraryNamed,
  UPSTREAM_LIBRARIES,
} from "akasha/temper/upstream-data/upstream-libraries/upstream-libraries.module.code.ts"
import { port as portZone } from "akasha/temper/upstream-data/zone-upstream-port/zone-upstream-port.module.code.ts"
import { saidBy as messageOf } from "akasha/utils/narrow/said-by/said-by.module.code.ts"

const CODE_ROOT_ENV = "CODE_ROOT"

const NAMED = [codeRootArgument, libraryArgument]

const PORTED_BY: Record<UpstreamLibrary, (root: string, done: string[]) => Promise<void>> = {
  housing: portHousing,
  "lib-map-data": portMapData,
  "lib-treasure": portTreasure,
  "lib-zone": portZone,
}

function carried(): string {
  return UPSTREAM_LIBRARIES.join(", ")
}

export type Porting = (done: string[], library: UpstreamLibrary, root: string) => Promise<Answer>

async function ported(done: string[], library: UpstreamLibrary, root: string): Promise<Answer> {
  await PORTED_BY[library](root, done)
  return told([`ported ${library} into ${root}, writing each emitted file whole`])
}

export async function portedBy(
  library: UpstreamLibrary,
  root: string,
  porting: Porting = ported
): Promise<Answer> {
  return await answering(async (done) => await porting(done, library, root))
}

export async function temperUpstreamDataPort(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return mistaking(read.refused)
  const taken = read.taken

  const named = taken.library
  const library = libraryNamed(named)
  if (library === undefined) {
    return refused(`${named} is no upstream library this ports — it carries ${carried()}`, INPUT)
  }

  const askedRoot = taken.codeRoot
  let root: string
  try {
    root = realpathSync(askedRoot ?? codeRoot())
  } catch (thrown) {
    return refused(
      `${askedRoot ?? codeRoot()} is no checkout on this disk, so nothing was ported into it: ${messageOf(thrown)}`,
      DATA
    )
  }

  process.env[CODE_ROOT_ENV] = root

  return await portedBy(library, root)
}
