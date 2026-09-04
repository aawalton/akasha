import {
  AGENT_LAUNCH_OPENED,
  AGENT_LAUNCH_SPAWNED,
} from "../supervising/supervisor-env/supervisor-env.module.code.ts"

export const SEAT_MODE_INTERACTIVE = "interactive"

export const SEAT_MODE_HEADLESS = "headless"

export const SEAT_MODES: readonly string[] = [SEAT_MODE_INTERACTIVE, SEAT_MODE_HEADLESS]

export function isSeatMode(value: string): boolean {
  return value === SEAT_MODE_INTERACTIVE || value === SEAT_MODE_HEADLESS
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
