import type { Module } from "@akasha/code-system/module"

export const committedOutcome = {
  id: "01a0622f-4550-7f67-8307-16e48ffd8ea5",
  pageTypeSlug: "module",
  slug: "committed-outcome",
  definition: "what an already-committed response does with the status upstream finally returns",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A status from 200 to 299 is spliced through.",
    },
    {
      invariantKind: "departure",
      statement: "A status outside 200 to 299 becomes an error frame.",
    },
    {
      invariantKind: "departure",
      statement: "A redirect is an error frame rather than a status to follow.",
    },
    {
      invariantKind: "departure",
      statement: "The name a status is given is the error type Anthropic gives that status.",
    },
    {
      invariantKind: "departure",
      statement: "Status 400 is named `invalid_request_error`.",
    },
    {
      invariantKind: "departure",
      statement: "Status 401 is named `authentication_error`.",
    },
    {
      invariantKind: "departure",
      statement: "Status 403 is named `permission_error`.",
    },
    {
      invariantKind: "departure",
      statement: "Status 404 is named `not_found_error`.",
    },
    {
      invariantKind: "departure",
      statement: "Status 413 is named `request_too_large`.",
    },
    {
      invariantKind: "departure",
      statement: "Status 429 is named `rate_limit_error`.",
    },
    {
      invariantKind: "departure",
      statement: "Status 503 and status 529 are named `overloaded_error`.",
    },
    {
      invariantKind: "departure",
      statement: "A status this module gives no name of its own is named `api_error`.",
    },
    {
      invariantKind: "departure",
      statement: "A client judges a committed hold by the error name.",
    },
    {
      invariantKind: "departure",
      statement: "The message names the status the message was made from.",
    },
    {
      invariantKind: "departure",
      statement: "A status that splices still gets an error name when an error name is asked for.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here builds the bytes of the frame this module names.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here sees more of a response than its status.",
    },
  ],
} as const satisfies Module
