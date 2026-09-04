import type { Domain } from "@akasha/domain-system/domain"

export const seatCapability = {
  id: "01a0658d-c92f-7b82-8a05-aaac4557d9a3",
  pageTypeSlug: "domain",
  slug: "seat-capability",
  definition: "what a seat is able to do",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat reads a document without changing the document.",
    },
    { invariantKind: "departure", statement: "A seat writes by changing what is in a repository." },
    {
      invariantKind: "departure",
      statement: "A seat runs by making something happen outside the repositories.",
    },
    {
      invariantKind: "departure",
      statement: "A seat speaks by putting words in front of a person or another seat.",
    },
    {
      invariantKind: "departure",
      statement: "A seat delegates by making or directing another agent.",
    },
    {
      invariantKind: "departure",
      statement: "A seat states by changing what the seat holds about itself.",
    },
    {
      invariantKind: "departure",
      statement: "One read names every document a seat is required to have read.",
    },
    {
      invariantKind: "departure",
      statement:
        "A read names a required document whether or not the record already holds that document.",
    },
    {
      invariantKind: "departure",
      statement:
        "Whether a command's help must be read first depends on how the command fails rather than on danger.",
    },
    {
      invariantKind: "departure",
      statement: "A command named inside a string or a heredoc counts as a call.",
    },
    {
      invariantKind: "departure",
      statement: "A live path inside akasha that nothing guards is a gap rather than permission.",
    },
    { invariantKind: "absence", statement: "Dispatch is never held to avoiding sharing a file." },
  ],
  directives: [
    {
      directiveKind: "rule",
      name: "Scratch Location",
      act: "Write every throwaway file under `/var/tmp`, never `/tmp`.",
      warrant:
        "Here `/tmp` is RAM the whole fleet shares, and it fills on file count rather than size.",
      aids: ["Never take a tool's `/tmp` default.", "A file Alan will open is not throwaway."],
    },
    {
      directiveKind: "rule",
      name: "Land On Main",
      act: "Land every change on main.",
      warrant: "Outside akasha nothing merges a branch, so a change on one is stranded.",
      aids: ["A refused push is not a missing branch.", "A worktree outside akasha buys nothing."],
    },
    {
      directiveKind: "rule",
      name: "Author Or Derive",
      act: "Run a change you can state as a rule as a script that commits its own work.",
      warrant:
        "A transformation arrives as thousands of small edits, so the authoring route looks right.",
      aids: [
        "A change you can state as a rule is not authored.",
        "Run the checks after rather than the gates before.",
      ],
    },
  ],
} as const satisfies Domain
