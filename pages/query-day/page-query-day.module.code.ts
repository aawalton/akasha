/**
 * The type an argument takes when what it names is one of Alan's tracked days.
 *
 * A caller has a date, so a query takes a date. What a session row holds is the *name* of the day
 * page it stands beside, and that name is the date on one side of the migration and `day-` and the
 * date on the other. `dayNameOf` in `tools/lib/tracking/day-place.ts` is the one rule that says
 * which, and an argument declared here is bound through it, so a query and the writer that filed
 * the row can never disagree about how a day is spelled: they are the same call.
 *
 * The name sits alone in this module because both the binder that reads it and the readout resolver
 * that fills it name it, and neither should have to import the other's closure to do so.
 */
export const TRACKING_DAY = "tracking-day"
