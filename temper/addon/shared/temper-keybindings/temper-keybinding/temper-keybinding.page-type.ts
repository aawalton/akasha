import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperKeybinding = {
  id: "01a18478-1f8b-7850-ba1b-24b52266113b",
  type: "page-type/page-type",
  slug: "temper-keybinding",
  definition: "the keys Alan binds one action of the game or of an add-on to",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "keybinding" },
    { partOfSpeech: "part-of-speech/noun", spelling: "keybindings" },
  ],
  extends: ["page-type/temper-thing"],
  parts: [
    "boolean-property/shared-across-characters",
    "instant-property/binding-changed-at",
    "number-property/binding-slot",
    "record-property/key-bindings",
    "select-property/binding-modifiers",
    "text-property/action-layer",
  ],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "text-property/action-layer", required: false, many: false },
    { pageProperty: "text-property/category", required: false, many: false },
    { pageProperty: "record-property/key-bindings", required: false, many: true, maxCount: 4 },
    { pageProperty: "boolean-property/shared-across-characters", required: true, many: false },
    { pageProperty: "instant-property/binding-changed-at", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A keybinding is a page for each action rather than a list on the account page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A keybinding names no account, since the add-on keeps its bindings per user profile on the machine.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A keybinding's key is the name the game gives its action.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A keybinding's slug is its action name in lower kebab case.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A keybinding's layer and category are the game's names for them in lower kebab case.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A keybinding landed before the add-on captured its action states no layer or category.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A keybinding stating no keys keeps its action unbound.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A shared keybinding is written onto every character at login.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A keybinding that is not shared is kept and written onto no character.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Of a change on a keybinding's page and one in the game, the later wins, and a tie keeps the page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each side states when it changed, the page by `changedAt` and the game by its capture.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A binding the game holds with no capture of when it changed is older than any page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A keybinding edited by hand states the instant of that edit as its `changedAt`.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-10-28T21:43:47.335Z",
  updatedAt: "2026-10-30T17:24:48.256Z",
} as const satisfies PageType
