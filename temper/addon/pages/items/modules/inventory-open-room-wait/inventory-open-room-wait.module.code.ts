export interface RoomWait {
  containers: number
  slotsTaken: number
}

export function waitForRoom(wait: RoomWait | undefined, slotsTaken: number): RoomWait {
  if (wait === undefined) return { containers: 1, slotsTaken }
  return { containers: wait.containers + 1, slotsTaken: Math.min(wait.slotsTaken, slotsTaken) }
}

export function roomWaitLine(wait: RoomWait, bufferSlots: number): string {
  const noun = wait.containers === 1 ? "container" : "containers"
  return `${wait.containers} ${noun} waiting: need ${bufferSlots + wait.slotsTaken} free slots`
}
