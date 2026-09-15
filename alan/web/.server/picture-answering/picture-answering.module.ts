import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pictureAnswering = {
  id: "01a09c61-a5d9-766a-9d6d-662757fe1a24",
  type: "module",
  slug: "picture-answering",
  definition: "what a route answers when a phone sends a picture in for its person's handler",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A sender is known by its device secret rather than by a session.",
    },
    {
      invariantKind: "departure",
      statement: "The picture is kept in the object store under an id minted for the picture.",
    },
    {
      invariantKind: "departure",
      statement: "The handler is told by a message naming that id rather than handed the bytes.",
    },
    {
      invariantKind: "departure",
      statement: "The phone is answered as soon as the picture is kept.",
    },
    {
      invariantKind: "departure",
      statement: "The message telling the seat is written after that answer rather than before it.",
    },
    {
      invariantKind: "constraint",
      statement: "Writing a message page takes seconds and keeping the bytes takes milliseconds.",
    },
    {
      invariantKind: "departure",
      statement: "A message that did not land is recorded as an error naming the picture's id.",
    },
    {
      invariantKind: "departure",
      statement: "The seat told is the one named for the person the device secret was minted to.",
    },
    {
      invariantKind: "departure",
      statement: "A seat nobody holds is refused rather than written to.",
    },
    {
      invariantKind: "departure",
      statement: "A picture is sent as a jpeg body and nothing else.",
    },
    {
      invariantKind: "departure",
      statement: "An answer to the native shell has the cross-origin headers that shell needs.",
    },
  ],
} as const satisfies Module
