import type { ShellScript } from "akasha/code-system/shell-scripts/shell-script.page-type.types.ts"

export const atlasIosAdd = {
  id: "01a090fe-4e12-7c8b-9e00-cbfb92e5c553",
  pageTypeSlug: "shell-script",
  type: "shell-script",
  slug: "atlas-ios-add",
  definition: "the run that makes Atlas's native sources and applies its seam",
  shell: "sh",
  sourced: false,
} as const satisfies ShellScript
