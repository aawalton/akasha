import {
  fiveHourSpent,
  type Reading,
  readingsIn,
  sevenDaySpent,
} from "@akasha/agents/claude-account-measuring"
import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"

// THE FLEET'S SPEND IS READ FROM AKASHA RATHER THAN REDUCED OUT OF A SAVED PAGE QUERY. The
// editor's two usage slots asked `claude-accounts-mean-session-used` and
// `claude-accounts-mean-weekly-used`, and both drew `—` rather than a number.
//
// THE PAGE TYPE MOVING IN IS ONLY HALF OF WHY. `54ee772b64` took
// `pages/page-type/claude-account.page-type.md` away, so `answer(roots, { pageType:
// "claude-account" })` answers null here. But nothing the editor runs asks the local engine: the
// router in `shared/pages-query/src/here.ts` sends a page type that does not stand here on to the
// store, and the store answers all eight accounts. What it cannot answer is what those two queries
// reduce over. `effective-five-hour-percent-used` and `effective-seven-day-percent-used` were
// derived properties declared in `pages/page-property-definition/claude-account-effective-*.md`,
// and the same commit deleted them with everything else claude-account owned. A mean over a
// property nothing declares is a mean over nothing, so both answered `over: 0` and the slots read
// null. Repointing the reader is the fix; teaching the old engine the page type would not be,
// because the derivations went with it and the account pages are TypeScript besides.
//
// THE TWO EXPRESSIONS ALREADY STAND IN AKASHA, SO NOTHING IS RE-DERIVED HERE. `fiveHourSpent` and
// `sevenDaySpent` in `claude-account-measuring` carry exactly what the deleted definitions said:
// a withdrawn subscription has spent all of both windows, and a five-hour window on an account
// whose seven-day window is spent is spent too. `akasha measure claude-accounts` prints its
// per-account column off the same two calls, so the mean here and that listing cannot drift.
//
// WHAT IS SPENT IS OBSERVED RATHER THAN STATED, WHICH IS WHY THE STORE HAS NONE OF IT. Every
// figure this reduces — both percentages and the disabled reason — is declared `uncommitted` on
// the claude-account page type and stands in the file beside each account's page. Only what an
// account states is landed, so only what it states reaches the store. Anything reading these
// numbers reads the checkout or reads nothing.

export interface Mean {
  readonly value: number | null
  readonly over: number
}

// The mean over the accounts carrying a figure, and how many carried one. An account with no
// reading is left out of the average rather than counted as having spent nothing, which is the
// same shape the old reduction had: a figure it could not read moved neither the mean nor `over`.
function meanOf(spent: readonly (number | null)[]): Mean {
  const held = spent.filter((one): one is number => one !== null)
  if (held.length === 0) return { value: null, over: 0 }
  return { value: held.reduce((sum, one) => sum + one, 0) / held.length, over: held.length }
}

export interface FleetUsage {
  readonly session: Mean
  readonly weekly: Mean
}

// What the fleet has spent of its two windows on average. A checkout naming no claude-account is
// refused rather than answered as a fleet that has spent nothing: the slots draw a percentage, and
// zero across the board is a reading Alan would act on rather than one he would read as unread.
export function readFleetUsage(): FleetUsage {
  const readings: readonly Reading[] = readingsIn(rootFor(resolveRoots(), AKASHA))
  if (readings.length === 0) {
    throw new Error(
      "no claude-account page stands in akasha, and every account holding a page is answered, " +
        "so a fleet of none is the pages going unread rather than a fleet with nothing spent"
    )
  }
  return {
    session: meanOf(readings.map(fiveHourSpent)),
    weekly: meanOf(readings.map(sevenDaySpent)),
  }
}
