import {
  AGENT_LAUNCH_OPENED,
  AGENT_LAUNCH_SPAWNED,
} from "../supervising/supervisor-env/supervisor-env.module.code.ts"

export const SEAT_MODE_INTERACTIVE = "interactive"

export const SEAT_MODE_HEADLESS = "headless"

export const SEAT_MODES: readonly string[] = [SEAT_MODE_INTERACTIVE, SEAT_MODE_HEADLESS]

// THE ONE SPELLING OF THE FLAG THAT PUTS A SEAT IN HEADLESS. A supervisor's own command line is
// what sets the mode it runs in, and both the parse of that line and the reading of it back sit
// on this name rather than on two copies of the same six characters.
export const HEADLESS_FLAG = "--headless"

export function isSeatMode(value: string): boolean {
  return value === SEAT_MODE_INTERACTIVE || value === SEAT_MODE_HEADLESS
}

// THE MODE A SEAT IS RUNNING IN IS READ OFF THE COMMAND LINE ITS SUPERVISOR IS RUNNING ON, WHICH IS
// A DIFFERENT FACT FROM THE MODE ON ITS PAGE. The page states the mode a seat was asked to start
// in; that value is written once and never revisited, so a seat resumed the other way keeps saying
// the mode it no longer runs in. Four seats stated `interactive` for days while their supervisors
// held `--headless`, which is what took them out of Remote Control, and nothing in the fleet could
// say so — the flag was read once at exec, turned into an environment variable for the child, and
// never written down anywhere a reader could reach.
//
// A LINE NAMING NO FLAG IS INTERACTIVE RATHER THAN NOTHING. This is not the guess that
// `startModeOfRowLaunch` refuses to make: there the launch was a value that might be missing or
// unreadable, so a default would state something unobserved. Here the whole line is in hand, and
// the absence of the flag is exactly what the supervisor itself acts on.
export function runningModeIn(argv: readonly string[]): string {
  return argv.includes(HEADLESS_FLAG) ? SEAT_MODE_HEADLESS : SEAT_MODE_INTERACTIVE
}

// HOW A SEAT STARTED AND HOW IT WAS LAUNCHED ARE THE SAME FACT UNDER TWO VOCABULARIES. The mode is
// what a seat states of itself; the launch is what the environment tells the agent inside it. These
// two carry one to the other so that neither vocabulary has to know the other's spellings.
export function rowLaunchOf(startMode: string): string {
  return startMode === SEAT_MODE_HEADLESS ? AGENT_LAUNCH_SPAWNED : AGENT_LAUNCH_OPENED
}

// A LAUNCH NAMING NEITHER ANSWERS NOTHING RATHER THAN GUESSING INTERACTIVE. A seat whose launch is
// unreadable is one nothing says the mode of, and answering the commoner of the two would state
// something about it that was never observed.
export function startModeOfRowLaunch(launch: string | null): string | null {
  if (launch === AGENT_LAUNCH_SPAWNED) return SEAT_MODE_HEADLESS
  if (launch === AGENT_LAUNCH_OPENED) return SEAT_MODE_INTERACTIVE
  return null
}
