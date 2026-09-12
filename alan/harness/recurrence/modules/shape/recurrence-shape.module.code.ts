export interface RecurrenceTask {
  rrule?: string | null
  dueDate?: string | null
  dueTime?: string | null
}

export interface RecurrenceDueResult {
  dueDate: string
  dueTime: string | null
}
