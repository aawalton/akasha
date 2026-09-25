import { readFile } from "node:fs/promises"
import { stringIn } from "akasha/code/type/narrowing/modules/string-in/string-in.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { image as imageArgument } from "akasha/command/argument/pages/image.argument.ts"
import { title as titleArgument } from "akasha/command/argument/pages/title.argument.ts"
import {
  answering,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { pagePicture as page } from "akasha/command/pages/page/picture/page-picture.command.ts"
import {
  imageDeps,
  landImage,
} from "akasha/infrastructure/inference/generation/image/modules/picture-landing/picture-landing.module.code.ts"
import { askingFor } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"

const WRITER = "page-picture <page-picture@alanwalton.com>"

const IMAGE_PAGE_TYPE_SLUG = "image"

async function idOf(slug: string): Promise<string | null> {
  const asked = await askingFor({
    pageTypeSlug: IMAGE_PAGE_TYPE_SLUG,
    where: { slug: { is: slug } },
    keys: ["id"],
  })
  if ("refused" in asked) return null
  const row = asked.rows[0]
  return row === undefined ? null : stringIn(row.id)
}

export async function pagePicture(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [imageArgument, titleArgument])
  if ("refused" in read) return refusedBy(read.refused)
  const { image: imagePath, title } = read.taken
  return await answering(async (done) => {
    let bytes: Uint8Array
    try {
      bytes = await readFile(imagePath)
    } catch {
      return refusedBy([`\`${imageArgument.said}\` names \`${imagePath}\`, which will not read`])
    }
    const values = title === undefined ? {} : { title }
    const landed = await landImage(imageDeps(WRITER), bytes, values, done)
    done.push(`slug\t${landed.slug}`)
    done.push(`id\t${(await idOf(landed.slug)) ?? "went unread"}`)
    return told(done)
  })
}
