import type { Module } from "@akasha/code-system/module"

export const sshDelivery = {
  id: "01a05cee-e560-75d3-9a15-b030e7638a12",
  pageTypeSlug: "module",
  slug: "ssh-delivery",
  definition: "the ssh wire settings shared by every ssh and rsync call to a host",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A script is delivered under the host's `/var/tmp` rather than its `/tmp`.",
    },
    {
      invariantKind: "departure",
      statement: "Every connection skips host key verification.",
    },
    {
      invariantKind: "absence",
      statement: "No known_hosts entry is kept for a host reached this way.",
    },
    {
      invariantKind: "departure",
      statement: "The delivered script deletes itself through a trap the shell fires on leaving.",
    },
    {
      invariantKind: "departure",
      statement: "A connection is given up after four missed keepalives fifteen seconds apart.",
    },
    {
      invariantKind: "departure",
      statement: "The same options are spelled once as argv and once joined into an -e string.",
    },
  ],
} as const satisfies Module
