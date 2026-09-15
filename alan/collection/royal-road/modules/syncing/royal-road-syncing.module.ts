import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const royalRoadSyncing = {
  id: "01a0686a-7a57-7b85-b362-7a71277ca88c",
  type: "page-type/module",
  slug: "royal-road-syncing",
  definition: "every chapter royal road lists for a story read and filed under that story",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A story is followed by the royal road id the story states.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That id is read off the story's record of royal road.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A story stating no such record is not followed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A chapter filed here states its id and link as one record of royal road.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No story page is created here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A chapter already held is known by its royal road id rather than by its title.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A chapter stating no royal road id is known by the id its link has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A chapter already filed is read whether that chapter names its story by page type or by slug alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A chapter royal road hides or keeps locked is left where that chapter is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A chapter's name opens with its story's slug.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The story's slug is followed by the chapter's position padded to four digits.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The title follows the position.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A title is cut back to whole words at fifty characters.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A name is cut back further where that name would otherwise run past a slug's hundred characters.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name another chapter already has takes the chapter's royal road id on the end.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A chapter's name is unique across every chapter rather than within its story.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A chapter names the story that chapter is part of by page type and slug rather than by slug alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A chapter names the unit its length is counted in the same way.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A story's status is restated only where royal road says ongoing or completed or hiatus.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A story naming no world is left unrestated and said to be.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A second and a half sits between one request to royal road and the next.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The pages composed are shown rather than landed unless the run was asked to commit those pages.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Pages land fifty at a time.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each fifty is its own commit.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page lands with the files beside that page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A file lands through a change named by address rather than through an edit composed here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page goes up through the change that works out the kind of the path handed in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page's id is worked out by that change rather than by the landing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A restated story whose page already has that body states no edit rather than refusing the batch.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A chapter refused for holding no prose is named by the page read and the refusal that chapter hit.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run that failed a chapter is a failed run however much else that run composed.",
    },
  ],
} as const satisfies Module
