import { resetSelectedCharacter } from "../skill-point-finder-char-list/skill-point-finder-char-list.module.code.ts"

export function skillPointsUpdate(this: void): undefined {
  resetSelectedCharacter()
}

export function questRemoved(this: void, _eventCode: number, isCompleted: boolean): undefined {
  if (isCompleted) {
    resetSelectedCharacter()
  }
}

export function levelUp(this: void, _eventCode: number, unitTag: string): undefined {
  if (unitTag === "player") {
    resetSelectedCharacter()
  }
}

export function achComplete(this: void): undefined {
  resetSelectedCharacter()
}

export function playerActivated(this: void): undefined {
  resetSelectedCharacter()
}

export function playerDeactivated(this: void): undefined {
  resetSelectedCharacter()
}
