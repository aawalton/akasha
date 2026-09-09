import type { ChangeAgent } from "../../change-agent.page-type.ts"

export const movePages = {
  id: "01a08863-b526-72fb-a4c4-99b6a097debc",
  pageTypeSlug: "change-agent",
  type: "change-agent",
  slug: "move-pages",
  changeMode: "change-mode-move",
  definition: "many pages carried into the folders their lines name, in one call",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Each line of the argument names a page and the folder that page moves into.",
    },
    {
      invariantKind: "departure",
      statement: "A line that is not a path and a folder parted by a space is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A line with nothing on it is read over.",
    },
    {
      invariantKind: "departure",
      statement: "A call handing in no line is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A line whose landing is named as a file rather than a folder is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A line naming the folder its page already sits in is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A page carried keeps the slug that page had.",
    },
    {
      invariantKind: "departure",
      statement: "Every file a page keeps beside that page moves with the page.",
    },
    {
      invariantKind: "departure",
      statement: "A body naming a path that moved is repointed in the same answer.",
    },
    {
      invariantKind: "departure",
      statement: "A line is carried against the world the lines before it leave.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal at any line refuses the whole call and names that line's pair.",
    },
    {
      invariantKind: "departure",
      statement: "A call that refuses carries no page at all.",
    },
    {
      invariantKind: "departure",
      statement: "Each carry is left to the mechanical change moving that kind of page.",
    },
    {
      invariantKind: "departure",
      statement: "That change is reached through the runner rather than by an import.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here changes the data a page states.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out a body of its own.",
    },
  ],
  changeKind: "change-checked",
} as const satisfies ChangeAgent
