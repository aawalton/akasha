import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const seat = {
  id: "01a05035-2609-7463-ba49-ccaf20f5c337",
  type: "page-type",
  slug: "seat",
  definition: "a place an agent works from",
  extends: ["page-type/agent"],
  mortal: true,
  parts: [
    "boolean-property/active-turn",
    "boolean-property/compacting",
    "boolean-property/live-shell",
    "boolean-property/live-subagent",
    "boolean-property/on-call",
    "boolean-property/send-in-flight",
    "domain/oauth-proxy",
    "domain/pty",
    "domain/seat-capability",
    "domain/seat-credential",
    "domain/seat-declaration",
    "domain/seat-fleet",
    "domain/seat-name",
    "domain/seat-name-claiming",
    "domain/seat-observation",
    "domain/seat-page",
    "domain/seat-reviving",
    "domain/seat-supervisor",
    "domain/self-healing",
    "file-property/subagent-edits",
    "file-property/subagent-reads",
    "file-property/subagent-refusals",
    "instant-property/restart-armed-at",
    "module/seat-launching",
    "module/seat-session",
    "module/seat-stopping",
    "module/seat-usage",
    "module/window-duration",
    "number-property/context-tokens",
    "number-property/proxy-port",
    "number-property/scanned-to",
    "page-type/log-source",
    "page-type/seat-conditions",
    "page-type/seat-log-day",
    "page-type/seat-turn-state",
    "process-property/proxy-process",
    "process-property/supervisor-process",
    "record-property/proxy",
    "record-property/request",
    "record-property/turn-pending",
    "record-property/turn-working",
    "relation-property/person",
    "relation-property/requested-action",
    "relation-property/role",
    "relation-property/seat-persona",
    "service-workstation/maintain-seat-pending",
    "service-workstation/memory-reaper",
    "service-workstation/recipient-resolver",
    "service-workstation/sweep-log-days",
    "service-workstation/sweep-supervisor-logs",
    "text-property/claude-code-session-uuid",
    "text-property/interrupt-message",
    "text-property/mode",
    "text-property/model",
    "text-property/open-shells",
    "text-property/proxy-version",
    "text-property/re-exec-ask",
    "text-property/registration-account",
    "text-property/rotated-session-uuid",
    "text-property/start-mode",
    "text-property/transcript-path",
  ],
  properties: [
    {
      pageProperty: "relation-property/seat-persona",
      required: true,
      many: false,
      default: "claude",
    },
    {
      pageProperty: "relation-property/role",
      required: true,
      many: false,
      default: "worker",
    },
    { pageProperty: "relation-property/person", required: false, many: false },
    { pageProperty: "text-property/start-mode", required: true, many: false },
    { pageProperty: "boolean-property/on-call", required: true, many: false },
    { pageProperty: "text-property/registration-account", required: true, many: false },
    {
      pageProperty: "text-property/transcript-path",
      required: false,
      many: false,
      uncommitted: true,
    },
    { pageProperty: "text-property/claude-code-session-uuid", required: false, many: false },
    {
      pageProperty: "process-property/supervisor-process",
      required: false,
      many: false,
      uncommitted: true,
    },
    { pageProperty: "record-property/proxy", required: false, many: false, uncommitted: true },
    { pageProperty: "text-property/mode", required: false, many: false, uncommitted: true },
    { pageProperty: "text-property/model", required: false, many: false, uncommitted: true },
    {
      pageProperty: "number-property/context-tokens",
      required: false,
      many: false,
      uncommitted: true,
    },
    {
      pageProperty: "record-property/turn-pending",
      required: false,
      many: false,
      uncommitted: true,
    },
    {
      pageProperty: "record-property/turn-working",
      required: false,
      many: false,
      uncommitted: true,
    },
    {
      pageProperty: "record-property/request",
      required: false,
      many: false,
      uncommitted: true,
    },
    {
      pageProperty: "text-property/re-exec-ask",
      required: false,
      many: false,
      uncommitted: true,
    },
    {
      pageProperty: "text-property/rotated-session-uuid",
      required: false,
      many: false,
      uncommitted: true,
    },
    {
      pageProperty: "file-property/subagent-edits",
      required: false,
      many: false,
      uncommitted: true,
      default: "jsonl",
    },
    {
      pageProperty: "file-property/subagent-reads",
      required: false,
      many: false,
      uncommitted: true,
      default: "jsonl",
    },
    {
      pageProperty: "file-property/subagent-refusals",
      required: false,
      many: false,
      uncommitted: true,
      default: "txt",
    },
  ],
  loadedBy: "module/agent-stated",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Re-stating a seat's attributes leaves the seat the same seat.",
    },
    {
      invariantKind: "departure",
      statement: "A persona has more than one seat.",
    },
    {
      invariantKind: "departure",
      statement: "A seat states the person who opened the seat or the seat that spawned the seat.",
    },
    {
      invariantKind: "departure",
      statement:
        "No seat states both the person who opened the seat and the seat that spawned the seat.",
    },
    {
      invariantKind: "departure",
      statement: "A seat states the mode the seat was started in.",
    },
    {
      invariantKind: "departure",
      statement: "A seat has the mode the seat is running in.",
    },
    {
      invariantKind: "departure",
      statement:
        "A seat keeps what a subagent under it left unlanded once that subagent's page goes.",
    },
    {
      invariantKind: "departure",
      statement:
        "What a seat keeps that way is beside the seat rather than in the seat's own edits.",
    },
    {
      invariantKind: "departure",
      statement: "A command reaches what a seat keeps that way.",
    },
    {
      invariantKind: "departure",
      statement:
        "A command takes a record a seat keeps that way into the seat's own edits, and an apply lands it.",
    },
    {
      invariantKind: "departure",
      statement: "A record a seat keeps that way may be one link of a chain that lands only whole.",
    },
    {
      invariantKind: "departure",
      statement: "Every record one path names is taken together, so such a chain is taken whole.",
    },
    {
      invariantKind: "departure",
      statement:
        "Whether a kept record landed already is undecidable where its new text sits inside its old.",
    },
    {
      invariantKind: "departure",
      statement: "Such a record is named and held back rather than taken on a guess.",
    },
    {
      invariantKind: "departure",
      statement: "The agent that has read such a record says to take it, and nothing else does.",
    },
    {
      invariantKind: "departure",
      statement: "A record a seat keeps that way says which subagent left it and when.",
    },
    {
      invariantKind: "departure",
      statement: "The time a record says is when the seat took the record.",
    },
    {
      invariantKind: "stopgap",
      statement: "A record the seat took before that says neither, and is left as it is.",
    },
    {
      invariantKind: "departure",
      statement: "Every reader of a seat reads the seat from akasha.",
    },
    {
      invariantKind: "departure",
      statement: "No writer of a seat writes the seat outside akasha.",
    },
    {
      invariantKind: "departure",
      statement: "No writer of a subagent writes the subagent outside akasha.",
    },
    {
      invariantKind: "departure",
      statement: "A seat's page remains while an agent is present in the seat.",
    },
    {
      invariantKind: "departure",
      statement: "A seat's page goes when no agent is present in the seat.",
    },
    {
      invariantKind: "departure",
      statement: "A seat outlives the initiative the seat was assigned.",
    },
    {
      invariantKind: "departure",
      statement: "A seat whose initiative is done is assigned again.",
    },
    {
      invariantKind: "departure",
      statement: "A seat on call is not swept.",
    },
    {
      invariantKind: "departure",
      statement: "Every value a seat has is either declared of the seat or observed of the seat.",
    },
    {
      invariantKind: "upkeep",
      statement: "Every value observed of a seat is declared on its page type.",
    },
    {
      invariantKind: "departure",
      statement: "A seat's id is the agent's id.",
    },
    {
      invariantKind: "constraint",
      statement: "A value observed of a seat changes every few seconds.",
    },
    {
      invariantKind: "constraint",
      statement:
        "A write that commits cannot have a value that is observed of a seat and can be observed again.",
    },
    {
      invariantKind: "departure",
      statement: "A value a seat is bound to cannot be observed again.",
    },
    {
      invariantKind: "departure",
      statement: "A value a seat is bound to is committed.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every writer of a seat's uncommitted values takes a lock keyed on the file the writer writes.",
    },
    {
      invariantKind: "departure",
      statement:
        "A supervisor restarts onto current code without interrupting the session that supervisor has.",
    },
    {
      invariantKind: "departure",
      statement: "A seat survives its own restart.",
    },
    {
      invariantKind: "constraint",
      statement: "A seat outlives the editor showing the seat and the agent sitting in the seat.",
    },
    {
      invariantKind: "departure",
      statement: "A seat is stopped by ending its processes.",
    },
    {
      invariantKind: "absence",
      statement: "No command sends a message from one seat to another seat.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing outside akasha defines a seat.",
    },
    {
      invariantKind: "gap",
      statement: "A seat at work keeps working while its page moves.",
    },
    {
      invariantKind: "departure",
      statement: "The seat page type names everything done to a seat.",
    },
    {
      invariantKind: "departure",
      statement: "Each thing done to a seat is a domain naming the modules that do it.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
