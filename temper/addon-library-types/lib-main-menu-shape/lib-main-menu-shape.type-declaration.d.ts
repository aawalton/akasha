interface LibMainMenu2Lib {
  Init: () => undefined
  AddMenuItem: (
    descriptor: string,
    sceneName: string,
    categoryLayoutInfo: object,
    unused: undefined
  ) => undefined
  SelectMenuItem: (descriptor: string) => undefined
}
