import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const wallpaper = {
  id: "01a07855-477e-7aa1-8183-3cb381287569",
  type: "page-type/route",
  slug: "wallpaper",
  definition: "the persona Alan wrote to most recently, answered as a picture for his phone",
  code: "ts",
  urlPath: "api/wallpaper",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The persona answered is the persona Alan wrote to most recently.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A tie is settled by the page id.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The picture is read off the persona's own mobile wallpaper.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A persona with no mobile wallpaper is passed over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Personas that went unread are refused rather than answered as no wallpaper.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reaches the object store.",
    },
  ],
} as const satisfies Route
