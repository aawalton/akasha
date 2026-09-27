export interface RoomWait {
  containers: number
  lootSlots: number
}

export function waitForRoom(wait: RoomWait | undefined, lootSlots: number): RoomWait {
  if (wait === undefined) return { containers: 1, lootSlots }
  return { containers: wait.containers + 1, lootSlots: Math.min(wait.lootSlots, lootSlots) }
}

export function roomWaitLine(wait: RoomWait, bufferSlots: number): string {
  const noun = wait.containers === 1 ? "container" : "containers"
  return `${wait.containers} ${noun} waiting: need ${bufferSlots + wait.lootSlots} free slots`
}
