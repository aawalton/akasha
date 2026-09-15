import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const inferenceRun = {
  id: "019ea7d8-5e16-7237-b2e0-4ce47633aa58",
  type: "page-type/page-type",
  slug: "inference-run",
  definition: "one loading of a model to make something, and how it went",
  extends: ["page-type/page"],
  parts: [
    "module/generation-log",
    "module/inference-run-record",
    "module/inference-run-services",
    "module/inference-run-store",
    "module/persist-audio",
    "module/persist-image",
    "module/persist-media",
  ],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run is opened before the model starts and closed as completed or failed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run records where its output was written rather than the output itself.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run that throws is finished as failed rather than left running.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The media a run made is kept as an object and named from the page that object was made under.",
    },
    { invariantKind: "invariant-kind/absence", statement: "Nothing here reaches a model service." },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here knows which host a service is on.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run is recorded as a row beside the generation log that run names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "What a recording landed is pushed into the caller's `done` as it lands.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A recording that threw part way names in its refusal what had landed by then.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
