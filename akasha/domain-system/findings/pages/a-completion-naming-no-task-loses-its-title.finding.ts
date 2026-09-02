import type { Finding } from "../finding.page-type.ts"

export const aCompletionNamingNoTaskLosesItsTitle = {
  id: "01a05feb-35e4-7fd4-bce3-23f454f57598",
  pageTypeSlug: "finding",
  slug: "a-completion-naming-no-task-loses-its-title",
  domainSlug: "domain/temper",
  claim:
    "Trimming a completion row to what is true of the completion drops `title`, which the task's own page restates for 1,171 of the 1,425 rows. The other 254 rows name no task, so nothing restates their title and the completion is left with an instant, a due date and no name at all. Twelve titles cover all 254.",
  evidence:
    "Measured on 2026-09-01 over `pages/temper-completed-month/*.tasks.jsonl`, 1,425 rows. 1,171 rows carry `task`, and every one of the 24 task slugs those rows name has a page under `akasha/temper/temper-progress/tasks/pages/`, so a title is readable from the task. 254 rows carry no `task`, and their titles are Affix Script Daily Quests 60, Dev Tracker 55, Signature Script Daily Quests 50, Solstice Daily Delve 20, Jester's Festival Daily Quest 7, Honest Toil (Zeal of Zenithar) 7, Herald of Death 6, Market Manipulator 5, Master Writs (Zeal of Zenithar) 4, Necrom Daily Delve 1, Antiquities 1, Test 1. Those 254 rows landed under `akasha/temper/temper-progress/completed-days/` carrying `completedAt`, `dueDate`, `character` and `completionCardId` and no name. Room is not the reason: a title averages some 30 bytes a row, the biggest day file is 7,428 bytes of the 15,000 the ceiling allows, and the whole day grain would still fit with titles on every row. The seven fields a row keeps were fixed by the decision this work carried out, so the eighth was left off rather than added back. What is open is whether a completion naming no task keeps its title, or whether a task page is made for each of the twelve so the title is read from the task as the other 1,171 read theirs.",
} as const satisfies Finding
