import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const pageUiBlockEditor = {
  id: "01a071cf-0a63-7750-ad97-3e1dcf0312b9",
  type: "page-type/domain",
  slug: "page-ui-block-editor",
  definition: "an editor for a page's text in blocks",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "block" },
    { partOfSpeech: "part-of-speech/noun", spelling: "blocks" },
  ],
  parts: [
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
