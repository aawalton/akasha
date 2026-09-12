import { DATA, OK } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer } from "akasha/commands/modules/calling/calling.module.code.ts"
import { refused } from "akasha/commands/modules/calling/calling.module.code.ts"
import { buildOf } from "akasha/infrastructure/container-image/image-build/image-build.module.code.ts"
import { publish } from "akasha/infrastructure/container-image/image-publishing/image-publishing.module.code.ts"

const IMAGE = "image"
const HELD = "the registry holds it"
const BUILT = "built and pushed"
const WOULD = "would be built"

export async function pushedImage(slug: string, dryRun: boolean, codeAt: string): Promise<Answer> {
  let said: string
  try {
    const done = await publish(buildOf(slug, codeAt), dryRun, codeAt)
    said = [IMAGE, done.ref, done.built ? BUILT : done.held ? HELD : WOULD].join("\t")
  } catch (thrown) {
    return refused(thrown instanceof Error ? thrown.message : String(thrown), DATA)
  }
  return { report: [said], refusals: [], code: OK }
}
