import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const builtImage = {
  id: "01a08193-c20c-7525-aced-8d801a2e9cd6",
  type: "page-type/page-type",
  slug: "built-image",
  definition: "a container image with a Dockerfile written for it",
  parts: [
    "built-image/auth-proxy",
    "built-image/buildkit",
    "built-image/bun-git",
    "built-image/ci",
    "built-image/kubectl",
    "file-property/image-dockerfile",
    "file-property/image-extensions",
    "module-property-group/extending",
    "select-property/image-kind",
    "text-property/image-folder",
    "text-property/image-repository",
  ],
  extends: ["page-type/domain"],
  properties: [
    { pageProperty: "select-property/image-kind", required: true, many: false },
    { pageProperty: "text-property/image-folder", required: true, many: false },
    { pageProperty: "file-property/image-dockerfile", required: true, many: false },
    { pageProperty: "file-property/image-extensions", required: false, many: false },
    { pageProperty: "text-property/image-repository", required: false, many: false },
    { pageProperty: "module-property-group/extending", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An image's Dockerfile is written from the image's stated values and kept beside its page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An image states the sort of Dockerfile written for that image.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An image adding to its Dockerfile keeps the addition beside its own page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An image adding nothing states no extensions.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An image naming no package installer is built with apk.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
