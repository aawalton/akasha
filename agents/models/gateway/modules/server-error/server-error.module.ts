import type { Module } from "@akasha/code-system/module"

export const serverError = {
  id: "01a0628c-26f7-7201-b637-f25306c00618",
  pageTypeSlug: "module",
  slug: "server-error",
  definition: "an upstream failure a later attempt can get past",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Status 529 matches whatever the body carries.",
    },
    {
      invariantKind: "departure",
      statement: "Status 500 matches whatever the body carries.",
    },
    {
      invariantKind: "departure",
      statement: "Status 502 matches whatever the body carries.",
    },
    {
      invariantKind: "departure",
      statement: "Status 503 matches whatever the body carries.",
    },
    {
      invariantKind: "departure",
      statement: "A matched 529 with no envelope message reads `overloaded (529)`.",
    },
    {
      invariantKind: "departure",
      statement: "A matched 500 with no envelope message reads `internal server error (500)`.",
    },
    {
      invariantKind: "departure",
      statement: "A matched 502 with no envelope message reads `bad gateway (502)`.",
    },
    {
      invariantKind: "departure",
      statement: "A matched 503 with no envelope message reads `service unavailable (503)`.",
    },
    {
      invariantKind: "departure",
      statement: "An envelope message replaces the reason the status alone would read.",
    },
    {
      invariantKind: "departure",
      statement: "The envelope error type is unread on a status this module matches by status.",
    },
    {
      invariantKind: "departure",
      statement: "Status 429 matches only an envelope naming `overloaded_error`.",
    },
    {
      invariantKind: "departure",
      statement: "A matched 429 with no envelope message reads `overloaded_error`.",
    },
    {
      invariantKind: "departure",
      statement: "A body carrying keys the envelope does not name still matches.",
    },
    {
      invariantKind: "departure",
      statement: "A status this module does not name matches nothing.",
    },
    {
      invariantKind: "departure",
      statement: "isServerError answers the matched flag classifyServerError returns.",
    },
    {
      invariantKind: "departure",
      statement: "A `Retry-After` of whole seconds sets the backoff in milliseconds.",
    },
    {
      invariantKind: "departure",
      statement: "A backoff read from `Retry-After` is capped at 8000 milliseconds.",
    },
    {
      invariantKind: "departure",
      statement: "A `Retry-After` of zero or less reads the schedule instead.",
    },
    {
      invariantKind: "departure",
      statement: "A `Retry-After` the number parser refuses reads the schedule instead.",
    },
    {
      invariantKind: "departure",
      statement: "A blank `Retry-After` reads the schedule instead.",
    },
    {
      invariantKind: "departure",
      statement: "A backoff with no `Retry-After` reads the schedule at the attempt's index.",
    },
    {
      invariantKind: "departure",
      statement: "An attempt past the schedule's end reads the schedule's last entry.",
    },
    {
      invariantKind: "departure",
      statement: "An empty schedule with no `Retry-After` backs off zero.",
    },
    {
      invariantKind: "departure",
      statement: "The schedule is handed in rather than read off SERVER_ERROR_BACKOFF_MS.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here waits.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here counts the attempts a caller has made.",
    },
    {
      invariantKind: "gap",
      statement: "An envelope message that is an empty string becomes an empty reason.",
    },
    {
      invariantKind: "gap",
      statement: "An attempt below zero backs off zero rather than the schedule's first entry.",
    },
    {
      invariantKind: "gap",
      statement: "A fractional attempt backs off zero rather than a scheduled wait.",
    },
    {
      invariantKind: "gap",
      statement: "A `Retry-After` holding an HTTP date reads the schedule instead.",
    },
  ],
} as const satisfies Module
