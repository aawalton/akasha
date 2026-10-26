import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const sshDelivery = {
  id: "01a05cee-e560-75d3-9a15-b030e7638a12",
  type: "page-type/module",
  slug: "ssh-delivery",
  definition: "the ssh wire settings shared by every ssh and rsync call to a host",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A script is delivered under the host's `/var/tmp` rather than its `/tmp`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every connection skips host key verification.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No known_hosts entry is kept for a host reached this way.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The delivered script deletes itself through a trap the shell fires on leaving.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The delivered script runs in a process group of its own on the host.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That group is ended whole once the ssh session that started it is gone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A script run to its end answers with its own exit, as if run directly.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A connection is given up after four missed keepalives fifteen seconds apart.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The same options are spelled once as argv and once joined into an -e string.",
    },
  ],
  createdAt: "2026-09-01T12:25:55.296Z",
  updatedAt: "2026-10-26T20:19:08.275Z",
} as const satisfies Module
