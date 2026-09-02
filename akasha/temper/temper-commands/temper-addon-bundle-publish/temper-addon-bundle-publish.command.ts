import type { Command } from "@akasha/command-system/command"

export const temperAddonBundlePublish = {
  id: "01a0603c-c1c8-7f53-b9d9-96714b600427",
  pageTypeSlug: "command",
  slug: "temper-addon-bundle-publish",
  definition:
    "the command putting the addon bundle into the cluster registry under its content hash",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "--code-root <path>", takes: "the checkout built from and written into" },
    { said: "--registry <host:port>", takes: "where the image is pushed" },
    { said: "--dry-run", takes: "build and hash, then push nothing and write nothing" },
  ],
  helpNotes: [
    "the registry is reached from the workstation rather than from the cluster.",
    "a build giving no archive, or one that cannot be read, refuses the call.",
    "the build, the image assembly and the push are each bounded, and one reaching its bound refuses the call.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The image is named by the hash of the archive inside.",
    },
    {
      invariantKind: "departure",
      statement: "A build giving no archive refuses the call.",
    },
    {
      invariantKind: "departure",
      statement: "A dry run builds and hashes and pushes nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A push that fails refuses the call.",
    },
  ],
} as const satisfies Command
