interface FancyActionBarLibrary {
  GetActionButton?: (this: void, actionSlotIndex: number) => ActionBarButton | undefined
}

declare const FancyActionBar: FancyActionBarLibrary | undefined
