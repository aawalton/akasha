import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-utils/combat-alerts-utils.module.code.ts"
import type { DamageableLines } from "akasha/temper/addon/pages/combat/combat-alerts-panels/modules/combat-alerts-damageable/combat-alerts-damageable.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"
import { crutchString } from "akasha/temper/addon/pages/combat/modules/combat-alerts-lang/combat-alerts-lang.module.code.ts"
import type { CrutchStringId } from "akasha/temper/addon/pages/combat/modules/combat-alerts-lang-ids/combat-alerts-lang-ids.module.code.ts"

function nameStr(this: void, id: CrutchStringId): string {
  return CRUTCH.GetCapitalizedString(crutchString(id))
}

export const DAMAGEABLE_DUNGEON_LINES: Record<string, DamageableLines> = {
  ["Kovan Giryon"]: {
    ["Scourge! I've waited a lifetime for you."]: 14.1,
  },
  ["Matriarch Lladi Telvanni"]: {
    ["This power is ours! I will control my own fate!"]: 18.1,
  },
  ["Saresea"]: {
    ["Well, I was right. Here it is."]: 9.7,
  },
  ["The Blind"]: {
    ["My spell destroys everything in my way!"]: 6.7,
  },
  [nameStr("CRUTCH_DMG_SNAGG_GROMASHUL")]: {
    [crutchString("CRUTCH_DMG_CONGRATULATIONS_YOUVE_PASSED_THE_FIRST_TRIAL")]: 15.1,
  },
  [nameStr("CRUTCH_DMG_THE_BEAST_MASTER")]: {
    [crutchString("CRUTCH_DMG_AND_THERE_WE_HAVE_IT_THE_WINNERS_OF_THE_GRAND")]: {
      time: 41.2,
      displayFormat: "INCINERATION BEETLES!!! in ",
    },
    [crutchString("CRUTCH_DMG_THESE_CHALLENGERS_ARE_SURPRISINGLY_FIERCE_BUT")]: 25.2,
    [crutchString("CRUTCH_DMG_WHAT_IMPOSSIBLE_HOW_DID_YOU_WIN")]: 19.7,
  },
  [nameStr("CRUTCH_BHB_LADY_THORN")]: {
    ["Well done, Talfyg. You brought me a daughter of Verandis, as requested. She will complement our lord's army well."]: 23.1,
    ["Gut gemacht, Talfyg. Ihr habt mir eine Tochter von Verandis gebracht. Wie erbeten. Sie wird die Armee unseres Fürsten gut ergänzen."]: 19.2,
  },
  ["Talfyg"]: {
    ["How dare you reject Lady Thorn's offer? Look! Tremble before the power you might have wielded!"]: 9.1,
  },
  ["Jakarn"]: {
    ["Hah! You thought I'd crack that soon? I'm Jakarn! The Jak—Kaleen?"]: 13.6,
  },
  ["Sarydil"]: {
    ["Well, well. Look what washed into our yaghra trap. You can surrender, or you can become bait. Choose."]: 13,
  },
  ["Dranos Velador"]: {
    ["Well done, my scaled friend. You have cast off your old skin, and the Silken Ring welcomes you as a brother. Seek out Velidreth and receive your blessing."]: 16.8,
  },
  [nameStr("CRUTCH_BHB_THE_WEEPING_WOMAN")]: {
    [crutchString("CRUTCH_DMG_FOR_HER_WE_KEPT_IT_HIDDEN_FROM_OUR_BRETHREN_AND")]: 11.1,
  },
  [nameStr("CRUTCH_DMG_THARAYYA")]: {
    [crutchString("CRUTCH_DMG_FEEL_THAT_A_CHILL_BREEZE_WE_MUST_BE_NEARING_AN")]: 22.7,
  },
  ["Druid Laurel"]: {
    ["He's killing the spirit. He has the seed. Stop him. Please stop him!"]: 11.2,
  },
  ["Cato Albus"]: {
    ["Who dares interrupt? I cannot avenge my son without these deaths!"]: 6.9,
  },
  ["Prime Sorcerer Vandorallen"]: {
    ["No one can stop us. You stand no chance!"]: 4.3,
  },
  ["Lucilla Caprenia"]: {
    ["Cato! It's over. Stop this madness!"]: 6.9,
  },
  ["Cernunnon"]: {
    ["Wake, little Jarl. See how your kingdom burns? Reap your vengeance."]: 8.3,
  },
  ["Jarl Skjoralmor"]: {
    ["I said to keep the fight out there! Oh, you aren't my guards. Nor are you Reachmen. We've won then?"]: 13.6,
  },
  [nameStr("CRUTCH_DMG_ORRYN_THE_BLACK")]: {
    [crutchString("CRUTCH_DMG_YOURE_STILL_HERE_IF_YOU_MUST_ADMIRE_MY_WORK_AT")]: 10.9,
    [crutchString("CRUTCH_DMG_CALUURION_SEE_THAT_OUR_UNINVITED_GUESTS_ARE_MADE")]: 14.2,
    [crutchString("CRUTCH_DMG_SO_MANY_OF_THE_THINGS_YOUVE_BROKEN_I_CAN_EASILY")]: 17.5,
  },
  ["Sister Gohlla"]: {
    ["More intruders? Marvelous. On your feet, my sweet boy. Smash them for mother, won't you?"]: 8.8,
  },
  ["Sister Maefyn"]: {
    ["So simple, is it? Arise, and fight on, champion!"]: 5.7,
  },
  ["Sister Bani"]: {
    ["Disgusting intruders! I won't have it. I will not have it!"]: 9.2,
  },
  ["Selene"]: {
    ["Now for payment in kind. It's my turn to study your insides, warlock!"]: 4.8,
    ["Nun zu meiner Vergeltung. Jetzt studiere ich Eure Eingeweide, Hexer!"]: 4.8,
  },
  ["Noriwen"]: {
    ["Alcunar!"]: { time: 5.3, singleZoneId: 1497 },
  },
  ["Sister Chana Nirine"]: {
    ["You'll never read this scroll!"]: 11,
  },
  [nameStr("CRUTCH_DMG_DAGRUND_THE_BULKY")]: {
    [crutchString("CRUTCH_DMG_TROLLS_BLOOD_IT_HAS_TO_BE_HERE_SOMEWHERE_KEEP")]: 18.2,
  },
  ["Nisaazda"]: {
    ["Renald is slippery, but Nisaazda will catch him in time. You will not be so lucky."]: 9.5,
    ["This one won't have to."]: 12.8,
  },
  ["Grundwulf"]: {
    ["I can feel it! Haha"]: 19,
  },
  [nameStr("CRUTCH_BHB_VYKOSA_THE_ASCENDANT")]: {
    [crutchString("CRUTCH_DMG_WAS_VYKOSA_NOT_TOLD_THE_INTRUDERS_WOULD_BE_DEALT")]: 14.7,
  },
  ["Anthelmir"]: {
    ["You cut me for the last time. Crush her!"]: 8.6,
  },
  ["Aradros the Awakened"]: {
    ["You think this place intimidates me? I am the forge's fire."]: 21.6,
  },
  ["Lyranth"]: {
    ["I expected greater resistance. It seems the Silver Rose are short on more than servants."]: 12.6,
    ["I feel a surge in the Daedric power. It's gathering."]: 22,
  },
  ["Prior Thierric Sarazen"]: {
    ["Does the heathen priest believe he can stand in the way of our divine purpose?"]: 21.8,
  },
  [nameStr("CRUTCH_DMG_PLAGUE_CONCOCTER_MORTIEU")]: {
    [crutchString("CRUTCH_DMG_SO_BUSY_SO_BUSY_AND_NOW_I_MUST_ENTERTAIN_THESE")]: 6.2,
  },
  ["Riftmaster Naqri"]: {
    ["No need to involve you, Magnastylus. I'll beat anyone who tries to get through here."]: 14.8,
  },
  ["Valinna"]: {
    ["Let's be done with this. I have important tasks to see to."]: 4.5,
    ["What are you waiting for? Keshargo? Come and get him."]: 4.6,
    ["You live? Let's fix that, shall we?"]: 5,
  },
  ["Caska"]: {
    ["Huh. Looks dead now."]: 5.2,
  },
  ["Captain Za'ji"]: {
    ["And we're through! That wasn't so hard now, was it?"]: 8.3,
    ["Come back you scaly scallywags! You take what is rightfully Captain Za'ji's!"]: 22.3,
  },
  ["Captain Numirril"]: {
    ["I am Dreadsail, born of the sea. I cannot be defeated!"]: 16,
  },
  ["Guardian Sud-Hareem"]: {
    ["Over there! It's Mereel!"]: 23.8,
  },
  ["Baron Zaudrus"]: {
    ["What you want is right here, Lyranth. Come take it."]: 12,
  },
  ["Martus Tullius"]: {
    ["The Daedra are pouring their energy into that machine!"]: 9.5,
  },
  ["Master Pellingare"]: {
    ["Allene! Varaine! It's your father! I love you, and I want to talk to you!"]: 20.4,
  },
  [nameStr("CRUTCH_BHB_HIATH_THE_BATTLEMASTER")]: {
    ["We have new challengers! Will they survive the competition, or will their blood decorate the floor of our grand Arena?"]:
      { time: 20.0, displayFormat: "Portal spawns in " },
    ["You dare to go on? This pleases my master. Let's hope you continue to please her and she grants you the strength to survive the coming battles."]:
      { time: 24.0, displayFormat: "Portal spawns in " },
    ["Every victory elevates you in the eyes of the master, mortals. But how will you fare in the marsh? Can you handle the mud and the bugs and the creatures intent on eating you once they defeat you?"]:
      { time: 27.1, displayFormat: "Portal spawns in " },
    ["I'm sure you're starting to wonder what's going on in here. You'll come to understand—provided you survive!"]:
      { time: 25.3, displayFormat: "Portal spawns in " },
    ["How puzzling! What could those strange tiles be used for? I guess you better figure it out quickly—if you don't want to die, of course!"]:
      { time: 22.1, displayFormat: "Portal spawns in " },
    ["And so your journey takes you into the depths of my master's domain. Her most-beloved worshipers reside here, including her favorite champions. Those who would gladly sacrifice themselves to become something … more."]:
      { time: 31.2, displayFormat: "Portal spawns in " },
    ["You must think you're really something. Arena after arena, you emerge victorious. But you are nothing. Nothing but lowly insects waiting to be stepped on."]:
      { time: 32.2, displayFormat: "Portal spawns in " },
  },
  ["Boethiah"]: {
    ["Now the real challenge begins, my honored contestants. My champion has been silenced so that I may congratulate you personally for making it this far. From this point on, you will be pushed to your limits."]:
      { time: 40.1, displayFormat: "Portal spawns in " },
    ["Your strength knows no bounds. Rarely have I seen a group that works so well together. The last time must have been, oh, those poor Mages Guild members I found in the Dwemer ruins years ago."]:
      { time: 36.0, displayFormat: "Portal spawns in " },
    ["And so the final challenge begins. Those who would represent me as champion now stand in this arena, deep within my realm. Only those who remain standing will receive my highest honor."]: 40.1,
  },
  ["K'Tora"]: {
    ["Ruella"]: 5.5,
    ["Churug"]: 5.5,
    ["Sheefar"]: 5.5,
    ["Girawell, K'Tora orders you into the fray!"]: 5.5,
    ["Muustikar"]: 5.5,
    ["Allow me to introduce Reefhammer, the bane of Ul'vor-Kus!"]: 5.5,
    ["Darkstorm"]: 5.5,
    ["Feel the power of Eejoba the Radiant!"]: 5.5,
    ["Tidewrack"]: 5.5,
    ["K'Tora summons Vsskalvor to protect this geyser!"]: 5.5,
    ["Girawell, K'Tora ruft Euch zum Gefecht!"]: 5.5,
    ["Erlaubt mir, Euch Riffhammer, den Fluch Ul'vor-Kus' vorzustellen!"]: 5.5,
    ["Dunkelsturm"]: 5.5,
    ["Spürt die Macht von Eejoba der Strahlenden!"]: 5.5,
    ["Gezeitenbruch"]: 5.5,
    ["K'Tora beschwört Vsskalvor, um diesen Geysir zu beschützen!"]: 5.5,
  },
}
