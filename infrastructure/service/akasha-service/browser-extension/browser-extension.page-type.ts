import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const browserExtension = {
  id: "01a15003-5b25-7a82-a1bb-d4f2b81dcb4b",
  type: "page-type/page-type",
  slug: "browser-extension",
  definition: "a program Chrome runs beside the pages Alan opens",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "browser extension" },
    { partOfSpeech: "part-of-speech/noun", spelling: "browser extensions" },
  ],
  extends: ["page-type/akasha-service"],
  parts: [
    "module-property-group/extension-worker",
    "module-property-group/extension-site",
    "module/chrome-reaching",
  ],
  properties: [
    { pageProperty: "module-property-group/extension-worker", required: false, many: false },
    { pageProperty: "module-property-group/extension-site", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A browser extension is built into a folder Chrome loads unpacked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That folder is the extension's slug under `~/.local/share/browser-extensions`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A browser extension's worker code states the manifest Chrome reads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The manifest names the worker as `worker.js` and the site code as `site.js`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each of the two is bundled whole into the file the manifest names.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Chrome runs a folder loaded unpacked again only once it is reloaded.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Chrome is told about a folder to load unpacked by Alan alone, and once.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-10-18T17:15:59.652Z",
  updatedAt: "2026-10-18T17:22:33.392Z",
} as const satisfies PageType
