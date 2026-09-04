import type { Finding } from "../finding.page-type.ts"

export const aReminderScheduleIsJudgedWhenItIsSentRatherThanWhenItIsWritten = {
  id: "01a05f71-8d3b-7000-8ec1-ace3d075aedf",
  pageTypeSlug: "finding",
  slug: "a-reminder-schedule-is-judged-when-it-is-sent-rather-than-when-it-is-written",
  domainSlug: "workspace-package/reminder-system",
  claim:
    "The recreation lost the reading a schedule got when a reminder was written, so a schedule no clock can read is caught on the next run of the service rather than by the write that put it there.",
  evidence:
    "`ops reminder set` read the schedule through `systemd-analyze calendar` before writing the file and refused a schedule that came back unreadable, so a reminder on disk always named a time. A reminder page is written with `akasha write`, which judges the schedule as text under 100 characters and reads no clock. `nextElapse` in `reminder-sending` still reads the schedule the same way and answers `unread` for one no clock can take, and `send-due-reminders` reports that reminder and carries on to the others. The window between the write and the report is however long the service waits, and a reminder in that window is never sent.",
} as const satisfies Finding
