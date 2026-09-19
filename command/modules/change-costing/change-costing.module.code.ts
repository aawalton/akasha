import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"

const COMMAND = "command"

export const CHANGE_APPLY_SLUG = "change-apply"

export const APPLY = "apply"

export function commandPageAt(root: string, slug: string): string {
  const listed = listedAt(root, COMMAND, slug)[0]
  if (listed === undefined) {
    throw new Error(
      `no \`${COMMAND}\` is slugged \`${slug}\`, so what a run cost is recorded nowhere`
    )
  }
  return listed.path
}
