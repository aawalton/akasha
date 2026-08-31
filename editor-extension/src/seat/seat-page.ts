import { akashaSeatsStanding } from '../../../tools/lib/seat-akasha-beside.ts';

// A SEAT IS READ FROM AKASHA, AND AKASHA ANSWERS FROM ITS INDEX RATHER THAN BY WALKING A FOLDER.
// Both of these opened every file in the old seat directory and hand-parsed its frontmatter to find
// an id, which is what a walk of that directory turns into: the index already holds the id against
// the name the seat stands under, so neither question opens a file at all.
//
// The markdown and sidecar parsers that stood here went with the store they were written for. The
// only reader of them composed a seat's transcript, and that reads what is observed of a seat from
// akasha now.

export async function agentIdsForSeatNames(
	names: readonly string[]
): Promise<ReadonlyMap<string, string>> {
	const wanted = new Set(names);
	const found = new Map<string, string>();
	for (const [id, name] of akashaSeatsStanding()) {
		if (wanted.has(name)) { found.set(name, id); }
	}
	return found;
}

export async function seatNamesStanding(): Promise<ReadonlySet<string>> {
	return new Set(akashaSeatsStanding().values());
}
