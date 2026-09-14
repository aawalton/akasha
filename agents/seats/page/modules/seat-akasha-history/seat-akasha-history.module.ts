import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const seatAkashaHistory = {
  id: "01a06949-b281-7b6f-900b-fa221e76dbd9",
  type: "module",
  slug: "seat-akasha-history",
  definition: "what a seat last said, read back out of git after its page in akasha is gone",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat is read from the newest commit that wrote its page.",
    },
    {
      invariantKind: "departure",
      statement: "A seat's moment is the time of the commit that wrote that seat.",
    },
    {
      invariantKind: "departure",
      statement: "Values come back under the key names the old page had.",
    },
    {
      invariantKind: "departure",
      statement: "A body that will not load leaves that seat out of the answer.",
    },
    {
      invariantKind: "departure",
      statement: "A reading of a root's history is held only while that history has not moved.",
    },
    {
      invariantKind: "constraint",
      statement: "A seat page removed from akasha is in no index.",
    },
    {
      invariantKind: "constraint",
      statement:
        "Git history is walked by the path a seat page had rather than by the seat page type.",
    },
    {
      invariantKind: "departure",
      statement:
        "History is walked over the folder the seats sit in now and every folder they sat in before.",
    },
    {
      invariantKind: "departure",
      statement:
        "A seat is named in history by the file its page is rather than by that file's folder.",
    },
    { invariantKind: "departure", statement: "A seat page taken away holds nothing in history." },
    {
      invariantKind: "departure",
      statement: "A seat page moved is taken away at the path it left.",
    },
    {
      invariantKind: "departure",
      statement: "Where more than one path could answer a seat's name, the newest path answers.",
    },
    {
      invariantKind: "departure",
      statement: "A root's history has moved where the commit that root is on has changed.",
    },
  ],
} as const satisfies Module
