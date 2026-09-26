import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/type/temper-addon-menu-global/temper-addon-menu-global.type-declaration.d.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"
import { groupMemberIconSettings } from "akasha/temper/addon/pages/combat/modules/combat-alerts-settings-group-icons/combat-alerts-settings-group-icons.module.code.ts"

export function worldIconSettings(this: void): LamControlData[] {
  return [
    {
      type: "submenu",
      name: "In-World Icons / Textures",
      controls: [
        {
          type: "description",
          text: 'Crutch can use the 3D API to draw textures (mostly single icons) in the world, including ones attached to players, as well as on the ground for positioning or other mechanics. Note that in order for these icons to be occluded by game objects, e.g. not show behind walls, you must have "SubSampling Quality" set to "High" in your Video settings.',
          width: "full",
        },
        {
          type: "slider",
          name: "Update interval",
          tooltip:
            "How often to update icons to follow players or face the camera, in milliseconds. Smaller interval appears smoother, but may reduce performance. Set to 0 to update every frame",
          min: 0,
          max: 100,
          step: 1,
          default: CRUTCH.defaultOptions.drawing.interval,
          width: "full",
          getFunc: () => CRUTCH.savedOptions.drawing.interval,
          setFunc: (value) => {
            CRUTCH.savedOptions.drawing.interval = value
            CRUTCH.Drawing.ForceRestartPolling()
          },
        },
        {
          type: "checkbox",
          name: "Use drawing levels",
          tooltip:
            "Whether to show closer icons on top of farther icons. If OFF, icons may appear somewhat out of order when viewing one on top of another, or have transparent edges that clip other icons. If ON, there may be a slight performance reduction",
          default: true,
          getFunc: () => CRUTCH.savedOptions.drawing.useLevels,
          setFunc: (value) => {
            CRUTCH.savedOptions.drawing.useLevels = value
          },
          width: "full",
        },
        ...groupMemberIconSettings(),
        {
          type: "submenu",
          name: "Positioning Markers",
          controls: [
            {
              type: "description",
              text: "These are settings for positioning-type markers placed on the ground, such as Lokkestiiz HM beam phase and Xoryn Tempest positions.",
              width: "full",
            },
            {
              type: "slider",
              name: "Opacity",
              tooltip: "How transparent the markers are. Mechanic markers may display differently",
              min: 0,
              max: 100,
              step: 5,
              default: CRUTCH.defaultOptions.drawing.placedPositioning.opacity * 100,
              width: "full",
              getFunc: () => CRUTCH.savedOptions.drawing.placedPositioning.opacity * 100,
              setFunc: (value) => {
                CRUTCH.savedOptions.drawing.placedPositioning.opacity = value / 100
                CRUTCH.OnPlayerActivated()
              },
            },
            {
              type: "checkbox",
              name: "Hide icons behind objects",
              tooltip:
                'Whether to use depth buffers to have icons be hidden by objects. For example, if this is ON, you won\'t be able to see the icon behind a tree. In order for this setting to work while ON, you must have "SubSampling Quality" set to "High" in your Video settings. Some markers, mainly ones that use text labels, will always show on top of objects regardless of this setting because of API limitations.',
              default: CRUTCH.defaultOptions.drawing.placedPositioning.useDepthBuffers,
              getFunc: () => CRUTCH.savedOptions.drawing.placedPositioning.useDepthBuffers,
              setFunc: (value) => {
                CRUTCH.savedOptions.drawing.placedPositioning.useDepthBuffers = value
                CRUTCH.OnPlayerActivated()
              },
              width: "full",
            },
            {
              type: "checkbox",
              name: "Use flat icons",
              tooltip:
                "Whether to have icons lie flat on the ground, instead of facing the camera. No guarantees of being easy to read; they are upright when you are facing directly north",
              default: CRUTCH.defaultOptions.drawing.placedPositioning.flat,
              getFunc: () => CRUTCH.savedOptions.drawing.placedPositioning.flat,
              setFunc: (value) => {
                CRUTCH.savedOptions.drawing.placedPositioning.flat = value
                CRUTCH.OnPlayerActivated()
              },
              width: "full",
            },
          ],
        },
        {
          type: "submenu",
          name: "Oriented Textures",
          controls: [
            {
              type: "description",
              text: "These are settings for various textures that are drawn in the world, that are oriented in a certain way, instead of always facing the player. For example, circles drawn on the ground, like in HoF triplets, fall under this category.",
              width: "full",
            },
            {
              type: "slider",
              name: "Opacity",
              tooltip:
                "How transparent the textures are. Mechanic textures may display differently",
              min: 0,
              max: 100,
              step: 5,
              default: CRUTCH.defaultOptions.drawing.placedOriented.opacity * 100,
              width: "full",
              getFunc: () => CRUTCH.savedOptions.drawing.placedOriented.opacity * 100,
              setFunc: (value) => {
                CRUTCH.savedOptions.drawing.placedOriented.opacity = value / 100
                CRUTCH.OnPlayerActivated()
              },
            },
            {
              type: "checkbox",
              name: "Hide textures behind objects",
              tooltip:
                'Whether to use depth buffers to have textures be hidden by objects. For example, if this is ON, you won\'t be able to see the circle behind a tree. In order for this setting to work while ON, you must have "SubSampling Quality" set to "High" in your Video settings',
              default: CRUTCH.defaultOptions.drawing.placedOriented.useDepthBuffers,
              getFunc: () => CRUTCH.savedOptions.drawing.placedOriented.useDepthBuffers,
              setFunc: (value) => {
                CRUTCH.savedOptions.drawing.placedOriented.useDepthBuffers = value
                CRUTCH.OnPlayerActivated()
              },
              width: "full",
            },
          ],
        },
        {
          type: "submenu",
          name: "Other Icons",
          controls: [
            {
              type: "description",
              text: "These are settings for other icons that appear to face the player, such as thrown potions from IA Brewmasters.",
              width: "full",
            },
            {
              type: "slider",
              name: "Opacity",
              tooltip: "How transparent the icons are. Mechanic icons may display differently",
              min: 0,
              max: 100,
              step: 5,
              default: CRUTCH.defaultOptions.drawing.placedIcon.opacity * 100,
              width: "full",
              getFunc: () => CRUTCH.savedOptions.drawing.placedIcon.opacity * 100,
              setFunc: (value) => {
                CRUTCH.savedOptions.drawing.placedIcon.opacity = value / 100
                CRUTCH.OnPlayerActivated()
              },
            },
            {
              type: "checkbox",
              name: "Hide icons behind objects",
              tooltip:
                'Whether to use depth buffers to have icons be hidden by objects. For example, if this is ON, you won\'t be able to see the icon behind a tree. In order for this setting to work while ON, you must have "SubSampling Quality" set to "High" in your Video settings',
              default: CRUTCH.defaultOptions.drawing.placedIcon.useDepthBuffers,
              getFunc: () => CRUTCH.savedOptions.drawing.placedIcon.useDepthBuffers,
              setFunc: (value) => {
                CRUTCH.savedOptions.drawing.placedIcon.useDepthBuffers = value
                CRUTCH.OnPlayerActivated()
              },
              width: "full",
            },
          ],
        },
      ],
    },
  ]
}
