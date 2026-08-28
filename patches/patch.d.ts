export declare const HERE: string;
export declare const GATED = "AKASHA_CHECKS_RAN";
export interface Landing {
    readonly relPath: string;
    readonly from: string;
}
export declare function fail(reason: string): never;
export declare function valueOf(argv: readonly string[], name: string): string | null;
export declare function payloadText(argv: readonly string[], wanted: boolean): string | null;
export declare function patchText(landings: readonly Landing[], removals?: readonly string[], root?: string): string;
export declare function gateOrRefuse(patch: string, changed: number, root?: string, goneElsewhere?: readonly string[], repointedElsewhere?: ReadonlyMap<string, string>): void;
