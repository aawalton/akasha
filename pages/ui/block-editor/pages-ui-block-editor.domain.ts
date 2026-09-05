import type { Domain } from "@akasha/domains/domain"

export const pagesUiBlockEditor = {
  id: "01a071cf-0a63-7750-ad97-3e1dcf0312b9",
  pageTypeSlug: "domain",
  slug: "pages-ui-block-editor",
  definition: "a page edited as blocks",
  partSlugs: [
    "module/block-accessory-bar",
    "module/block-editor",
    "module/block-row",
    "module/block-tree",
    "module/block-type-helpers",
    "module/save-queue",
    "module/slash-menu",
    "module/use-block-collapse",
    "module/use-block-focus",
    "module/use-block-keys",
    "module/use-block-ops",
    "module/use-block-persistence",
    "module/use-block-selection",
    "module/use-coarse-pointer",
    "module/use-keyboard-inset",
    "module/use-textarea-input",
  ],
} as const satisfies Domain
