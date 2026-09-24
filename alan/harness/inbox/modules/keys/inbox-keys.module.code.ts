export type InboxKey = "email" | "tasks" | "temperTasks" | "findings" | "gaps"

export const INBOX_KEYS: readonly InboxKey[] = ["email", "tasks", "temperTasks", "findings", "gaps"]

export const COUNT_ATTR: Readonly<Partial<Record<InboxKey, string>>> = {
  tasks: "inbox-tasks",
  temperTasks: "inbox-temper-tasks",
  findings: "inbox-findings",
  gaps: "inbox-gaps",
}

export const CLEARED_ATTR: Readonly<Partial<Record<InboxKey, string>>> = {
  tasks: "inbox-tasks-cleared-today",
  temperTasks: "inbox-temper-tasks-cleared-today",
  findings: "inbox-findings-cleared-today",
}
