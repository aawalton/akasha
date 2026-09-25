import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const serverError = {
  id: "01a0628c-26f7-7201-b637-f25306c00618",
  type: "page-type/module",
  slug: "server-error",
  definition: "an upstream failure a later attempt can get past",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Status 529 matches whatever the body has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Status 500 matches whatever the body has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Status 502 matches whatever the body has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Status 503 matches whatever the body has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A matched 529 with no envelope message reads `overloaded (529)`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A matched 500 with no envelope message reads `internal server error (500)`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A matched 502 with no envelope message reads `bad gateway (502)`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A matched 503 with no envelope message reads `service unavailable (503)`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An envelope message replaces the reason the status alone would read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The envelope error type is unread on a status this module matches by status.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Status 429 matches only an envelope naming `overloaded_error`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A matched 429 with no envelope message reads `overloaded_error`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body carrying keys the envelope does not name still matches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A status this module does not name matches nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A `Retry-After` of whole seconds sets the backoff in milliseconds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A backoff read from `Retry-After` is capped at 8000 milliseconds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A `Retry-After` at zero or below reads the schedule instead.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A `Retry-After` the number parser refuses reads the schedule instead.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A blank `Retry-After` reads the schedule instead.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A backoff with no `Retry-After` reads the schedule at the attempt's index.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An attempt past the schedule's end reads the schedule's last entry.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An empty schedule with no `Retry-After` backs off zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The schedule is handed in rather than read off SERVER_ERROR_BACKOFF_MS.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here waits.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here counts the attempts a caller has made.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An empty envelope message reads as the reason with no envelope message.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An attempt below zero backs off the schedule's first entry.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fractional attempt backs off the entry at the whole attempt below it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A `Retry-After` holding an HTTP date ahead backs off up to that date.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A `Retry-After` holding an HTTP date already passed reads the schedule instead.",
    },
  ],
} as const satisfies Module
