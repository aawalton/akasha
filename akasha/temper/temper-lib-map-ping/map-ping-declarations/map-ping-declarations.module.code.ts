declare global {
  interface WorldMapManagerControl {
    UnregisterForEvent: (this: WorldMapManagerControl, event: number) => boolean
  }

  interface WorldMapManager {
    control: WorldMapManagerControl
  }

  const WORLD_MAP_MANAGER: WorldMapManager
}

export {}
