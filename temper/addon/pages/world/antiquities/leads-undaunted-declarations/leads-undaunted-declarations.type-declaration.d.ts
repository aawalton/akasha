interface UndauntedPledgeDungeon {
  GetNormalId: (this: UndauntedPledgeDungeon) => number
  GetName: (this: UndauntedPledgeDungeon) => string
}

interface UndauntedDailyApi {
  GetPledgeDungeons: (this: void) => UndauntedPledgeDungeon[] | undefined
}

declare var UndauntedDaily: UndauntedDailyApi | undefined
