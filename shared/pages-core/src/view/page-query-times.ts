/**
 * The points in time a page query can name.
 *
 * THE LIST PAGE IS THE STORE, AND THIS IS THE ONE PROJECTION OF IT. `pages/list/page-query-times`
 * states these names and what each one means; browser code cannot read a file, so the names are
 * restated here once and the `page-query-times-projected` check refuses a change to either that
 * leaves them disagreeing.
 *
 * ONE SET, BECAUSE TWO DRIFTED. The view path that turns a file-spelled view into a view config
 * held its own set of four and the in-process resolver that swaps a name for the moment it stands
 * for held its own set of two. Each was right about its own premise and neither was wrong on its
 * own terms, so nothing met both — and a query naming `eso-day` was honoured in the browser and
 * matched nothing at all on the workstation, which is a legal answer of zero and reads exactly
 * like a true one.
 */
export const PAGE_QUERY_TIMES = ["now", "eso-day", "eso-day-next", "wake-day"] as const

export type PageQueryTime = (typeof PAGE_QUERY_TIMES)[number]

/**
 * The named time this text is, or null where it names none.
 *
 * ANSWERS THE UNION RATHER THAN A BOOLEAN, so a caller that resolves these names switches over
 * the set and stops compiling when a name is added to it. A recognizer answering yes or no lets
 * a new name be admitted everywhere and resolved nowhere, which is how these two came apart.
 */
export function pageQueryTimeIn(text: string): PageQueryTime | null {
  return PAGE_QUERY_TIMES.find((one) => one === text) ?? null
}
