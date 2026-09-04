export type InboxKey = "email" | "tasks" | "temperTasks"

export const INBOX_KEYS: readonly InboxKey[] = ["email", "tasks", "temperTasks"]

export const COUNT_ATTR: Readonly<Partial<Record<InboxKey, string>>> = {
  tasks: "inbox-tasks",
  temperTasks: "inbox-temper-tasks",
}

export const CLEARED_ATTR: Readonly<Partial<Record<InboxKey, string>>> = {
  tasks: "inbox-tasks-cleared-today",
  temperTasks: "inbox-temper-tasks-cleared-today",
}
